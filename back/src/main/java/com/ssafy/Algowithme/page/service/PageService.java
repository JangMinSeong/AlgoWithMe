package com.ssafy.Algowithme.page.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.common.util.S3Util;
import com.ssafy.Algowithme.page.dto.PageInfo;
import com.ssafy.Algowithme.page.dto.request.*;
import com.ssafy.Algowithme.page.dto.response.CreateDocsPageResponse;
import com.ssafy.Algowithme.page.dto.response.CreateProblemPageResponse;
import com.ssafy.Algowithme.page.dto.response.MemoResponse;
import com.ssafy.Algowithme.page.dto.response.PageListResponse;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.entity.UserWorkspace;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.page.repository.UserWorkspaceRepository;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.team.TeamRepository;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.entity.UserTeam;
import com.ssafy.Algowithme.user.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PageService {

    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;
    private final PageRepository pageRepository;
    private final ProblemRepository problemRepository;
    private final RawProblemRepository rawProblemRepository;
    private final UserWorkspaceRepository userWorkspaceRepository;
    private final S3Util s3Util;

    public PageListResponse getPageList(Long teamId, User user) {
        //팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        // 팀 내 페이지 조회
        List<Page> pages = pageRepository.findByTeamIdAndDeletedOrderByParentIdAscOrdersAsc(teamId, false);

        HashMap<Long, PageInfo> pageInfoMap = new HashMap<>();
        List<PageInfo> result = new ArrayList<>();

        for(int i=0; i<pages.size(); i++) {
            Page page = pages.get(i);
            pageInfoMap.put(page.getId(), PageInfo.create(page));
            if(page.getParent() == null) {
                result.add(pageInfoMap.get(page.getId()));
            }
        }

        for(int i=0; i<pages.size(); i++) {
            Page page = pages.get(i);

            PageInfo pageInfo = pageInfoMap.get(pages.get(i).getId());
            if(page.getParent() == null) continue;

            PageInfo parentPageInfo = pageInfoMap.get(pages.get(i).getParent().getId());
            parentPageInfo.getChildren().add(pageInfo);
        }

        return new PageListResponse(result);
    }

    @Transactional
    public CreateDocsPageResponse createDocsPage(CreateDocsPageRequest request, User user) {
        //팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        //팀 조회
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        //페이지 저장
        Page page = getPage(team, request.getPageId());

        return new CreateDocsPageResponse(page.getId());
    }

    @Transactional
    public CreateProblemPageResponse createProblemPage(CreateProblemPageRequest request, User user) {
        //팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        //팀 조회
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        //페이지 저장
        Page page = getPage(team, request.getPageId());

        //문제 조회
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
        RawProblem rawProblem = rawProblemRepository.findById(problem.getUid())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //문제 저장
        page.setProblem(problem);
        page.setTitle(problem.getName());

        return CreateProblemPageResponse.create(page.getId(), rawProblem);
    }

    private Page getPage(Team team, Long pageId) {
        Page page;
        if(pageId == -1) {
            //순서 조회
            int order = pageRepository.countByTeamIdAndParentIsNull(team.getId());
            System.out.println("-1인 경우: " + order);

            //페이지(워크 스페이스) 생성 및 저장
            page = pageRepository.save(Page.builder()
                    .team(team)
                    .parent(null)
                    .orders((double) order)
                    .build());
        } else {
            //부모 페이지 조회
            Page parentPage = pageRepository.findById(pageId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

            //순서 조회
            int order = pageRepository.countByTeamIdAndParentId(team.getId(), parentPage.getId());

            //페이지(워크 스페이스) 생성 및 저장
            page = pageRepository.save(Page.builder()
                    .team(team)
                    .parent(parentPage)
                    .orders((double) order)
                    .build());

            //부모 페이지에 현재 페이지 저장
            parentPage.getChild().add(page);
        }
        return page;
    }

    @Transactional
    public MemoResponse getMemo(Long pageId, User user) {
        // page 조회
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        // team 조회
        Team team = teamRepository.findById(page.getTeam().getId())
                        .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        // 팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), team.getId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));
        
        // userId 와 pageId 로 조회
        Optional<UserWorkspace> optionalUserWorkspace = userWorkspaceRepository.findByWorkspaceIdAndUserId(pageId, user.getId());

        UserWorkspace userWorkspace;

        if(optionalUserWorkspace.isPresent()) {
            // 조회되는 경우
            userWorkspace = optionalUserWorkspace.get();
        } else {
            // 조회되지 않은 경우, 개인메모 생성 후 반환
            userWorkspace = userWorkspaceRepository.save(UserWorkspace.builder()
                            .user(user)
                            .workspace(page)
                            .content("")
                            .build());
        }

        return MemoResponse.create(userWorkspace);
    }

    @Transactional
    public void updateMemo(UpdateMemoRequest request) {
        //개인메모 조회
        UserWorkspace userWorkspace = userWorkspaceRepository.findById(request.getUserWorkspaceId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USERWORKSPACE_NOT_FOUND));

        //개인메모 내용 수정
        userWorkspace.setContent(request.getContent());
    }

    @Transactional
    public void changePageTitle(User user, Long pageId, String title) {
        //TODO : user의 page에 대한 권한 확인

        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        page.setTitle(title);
        pageRepository.save(page);
    }

    @Transactional
    public void deletePage(User user, Long pageId) {
        //TODO : user의 page에 대한 권한 확인

        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        page.setDeleted(true);

        List<Page> deletedPage = new ArrayList<>();
        deletedPage.add(page);

        Queue<Page> pageQueue = new ArrayDeque<>(page.getChild());

        while(!pageQueue.isEmpty()){
            Page dPage = pageQueue.poll();

            dPage.setDeleted(true);
            deletedPage.add(dPage);

            pageQueue.addAll(dPage.getChild());
        }

        pageRepository.saveAll(deletedPage);
    }

    @Transactional
    public void changeParentPage(User user, Long pageId, Long parentId) {
        //TODO : user의 page에 대한 권한 확인

        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        Page parentPage = pageRepository.findById(parentId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        Page checkPage;
        checkPage = parentPage;

        while (checkPage.getParent() != null) {
            if (checkPage.getParent().getId().equals(pageId)) {
                throw new CustomException(ExceptionStatus.PARENT_PAGE_CANNOT_BE_CHILD_PAGE);
            }

            checkPage = checkPage.getParent();
        }

        page.setParent(parentPage);

        pageRepository.save(page);
    }

    public String uploadImage(User user, Long pageId, MultipartFile file) {
        //페이지 확인
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        //팀원 여부 확인
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), page.getTeam().getId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        //S3 이미지 저장
        String url = s3Util.uploadVideo(file, "/page" + pageId, LocalDateTime.now().toString());

        return url;
    }

    @Transactional
    public void changePosition(User user, ChangePositionRequest request) {
        //TODO : user의 page에 대한 권한 확인
        //페이지 조회
        Page page = pageRepository.findById(request.getPageId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        if(page.isDeleted()) {
            throw new CustomException(ExceptionStatus.PAGE_NOT_FOUND);
        }

        //팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), page.getTeam().getId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        //상위 페이지 변경 여부 확인
        if((request.getParentPageId().equals(-1L) && page.getParent() == null) ||
                (page.getParent() != null && request.getParentPageId().equals(page.getParent().getId()))) {
            //기존 상위 페이지에서 order 변경
            changeOrderCurrentParent(page, request.getParentPageId(), request.getOrder());
        } else {
            //기존 상위 페이지와 이후 상위 페이지에서 order 변경
            changeOrderCurrentAndNextParent(page, request.getParentPageId(), request.getOrder());
        }
    }

    private void changeOrderCurrentAndNextParent(Page page, Long nextParentPageId, int order) {
        //기존 부모페이지에서 순서 변경
        Long parentPageId = (page.getParent() == null ? -1L : page.getParent().getId());
        List<Page> childrenPages = getChildrenPages(page, parentPageId);
        childrenPages.remove(page.getOrders().intValue());
        for(int i=0; i<childrenPages.size(); i++) {
            Page child = childrenPages.get(i);
            child.setOrders((double) i);
        }

        //이후 부모페이지에서 순서 변경
        childrenPages = getChildrenPages(page, nextParentPageId);
        childrenPages.add(order, page);
        for(int i=0; i<childrenPages.size(); i++) {
            Page child = childrenPages.get(i);
            child.setOrders((double) i);
        }

        //이후 부모 페이지 조회 및 변경
        validateAndUpdateParent(page, nextParentPageId);
    }

    private void validateAndUpdateParent(Page page, Long parentPageId) {
        if(parentPageId.equals(-1L)) {
            //최상위 페이지인 경우
            page.setParent(null);
        } else {
            //최상위 페이지가 아닌 경우
            //다음 부모 페이지 조회
            Page nextParentPage = pageRepository.findById(parentPageId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

            //부모 페이지 유효성 확인
            Page checkPage;
            checkPage = nextParentPage;

            while (checkPage.getParent() != null) {
                if (checkPage.getParent().getId().equals(page.getId())) {
                    throw new CustomException(ExceptionStatus.PARENT_PAGE_CANNOT_BE_CHILD_PAGE);
                }
                checkPage = checkPage.getParent();
            }

            page.setParent(nextParentPage);
        }
    }

    private void changeOrderCurrentParent(Page page, Long parentPageId, int order) {
        //위치 변동이 없을 경우
        if(page.getOrders().equals((double) order)) return;

        //자식 페이지 조회
        List<Page> childrenPages = getChildrenPages(page, parentPageId);

        //기존 페이지 순서 변경
        childrenPages.remove(page.getOrders().intValue());
        childrenPages.add(order, page);
        for(int i=0; i<childrenPages.size(); i++) {
            Page child = childrenPages.get(i);
            child.setOrders((double) i);
        }
    }

    private List<Page> getChildrenPages(Page page, Long parentPageId) {
        List<Page> childrenPages;
        if(parentPageId.equals(-1L)) {
            childrenPages = pageRepository.findByTeamIdAndDeletedAndParentIsNullOrderByOrders(page.getTeam().getId(), false);
        } else {
            childrenPages = pageRepository.findByParentIdAndDeletedOrderByOrders(parentPageId, false);
        }
        return childrenPages;
    }
}


