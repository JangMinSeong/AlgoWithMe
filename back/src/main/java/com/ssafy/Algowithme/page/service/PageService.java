package com.ssafy.Algowithme.page.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.dto.PageInfo;
import com.ssafy.Algowithme.page.dto.request.CreateDocsPageRequest;
import com.ssafy.Algowithme.page.dto.request.CreateProblemPageRequest;
import com.ssafy.Algowithme.page.dto.request.UpdateMemoRequest;
import com.ssafy.Algowithme.page.dto.request.UpdatePagePositionRequest;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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

    public PageListResponse getPageList(Long teamId, User user) {
        //팀원 여부 확인
        userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        // 팀 내 페이지 조회
        List<Page> pages = pageRepository.findByTeamIdOrderByParentIdAscOrdersAsc(teamId);

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

    public void updatePosition(UpdatePagePositionRequest request, User user) {

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
}


