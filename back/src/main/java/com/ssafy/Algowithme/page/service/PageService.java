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
import com.ssafy.Algowithme.page.entity.WorkspaceTag;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.page.repository.UserWorkspaceRepository;
import com.ssafy.Algowithme.page.repository.WorkspaceTagRepository;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import com.ssafy.Algowithme.problem.type.Tag;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.team.TeamRepository;
import com.ssafy.Algowithme.user.entity.User;
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
  private final WorkspaceTagRepository workspaceTagRepository;
  private final S3Util s3Util;

  public PageListResponse getPageList(Long teamId, User user) {
    userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
        .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

    List<Page> pages = pageRepository.findByTeamIdAndDeletedOrderByParentIdAscOrdersAsc(teamId, false);
    HashMap<Long, PageInfo> pageInfoMap = new HashMap<>();
    List<PageInfo> result = new ArrayList<>();

    for (int i = 0; i < pages.size(); i++) {
      Page page = pages.get(i);

      pageInfoMap.put(page.getId(), PageInfo.create(page));
      if (page.getParent() == null) {
        result.add(pageInfoMap.get(page.getId()));
      }
    }

    for (int i = 0; i < pages.size(); i++) {
      Page page = pages.get(i);
      if (page.getParent() == null) {
        continue;
      }
      PageInfo pageInfo = pageInfoMap.get(pages.get(i).getId());
      PageInfo parentPageInfo = pageInfoMap.get(pages.get(i).getParent().getId());
      parentPageInfo.getChildren().add(pageInfo);
    }

    return new PageListResponse(result);
  }

  @Transactional
  public CreateDocsPageResponse createDocsPage(CreateDocsPageRequest request, User user) {
    userTeamRepository.findByUserIdAndTeamId(user.getId(), request.getTeamId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

    Team team = teamRepository.findById(request.getTeamId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

    Page page = createPage(team, request.getPageId());

    return new CreateDocsPageResponse(page.getId());
  }

  @Transactional
  public CreateProblemPageResponse createProblemPage(CreateProblemPageRequest request, User user) {
    userTeamRepository.findByUserIdAndTeamId(user.getId(), request.getTeamId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

    Team team = teamRepository.findById(request.getTeamId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

    Page page = createPage(team, request.getPageId());

    Problem problem = problemRepository.findById(request.getProblemId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
    RawProblem rawProblem = rawProblemRepository.findById(problem.getUid())
        .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

    page.setProblem(problem);
    page.setTitle(problem.getName());

    return CreateProblemPageResponse.create(page.getId(), rawProblem);
  }

  private Page createPage(Team team, Long pageId) {
    Page page;
    if (pageId == -1) {
      int order = pageRepository.countByTeamIdAndParentIsNullAndDeletedFalse(team.getId());

      page = pageRepository.save(Page.builder()
          .team(team)
          .title("빈 페이지")
          .parent(null)
          .orders((double) order)
          .build());
    } else {
      Page parentPage = pageRepository.findById(pageId)
          .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

      int order = pageRepository.countByTeamIdAndParentIdAndDeletedFalse(team.getId(), parentPage.getId());

      page = pageRepository.save(Page.builder()
          .team(team)
          .title("빈 페이지")
          .parent(parentPage)
          .orders((double) order)
          .build());

      parentPage.getChild().add(page);
    }
    return page;
  }

  @Transactional
  public MemoResponse getMemo(Long pageId, User user) {
    Page page = pageRepository.findById(pageId)
        .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

    Team team = teamRepository.findById(page.getTeam().getId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

    userTeamRepository.findByUserIdAndTeamId(user.getId(), team.getId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

    Optional<UserWorkspace> optionalUserWorkspace = userWorkspaceRepository.findByWorkspaceIdAndUserId(
        pageId, user.getId());

    UserWorkspace userWorkspace;
    if (optionalUserWorkspace.isPresent()) {
      userWorkspace = optionalUserWorkspace.get();
    } else {
      userWorkspace = userWorkspaceRepository.save(UserWorkspace.builder()
          .user(user)
          .workspace(page)
          .content("")
          .build());
    }

    return MemoResponse.create(userWorkspace);
  }

  @Transactional
  public void updateMemo(UpdateMemoRequest request, User user) {
    UserWorkspace userWorkspace = userWorkspaceRepository.findById(request.getUserWorkspaceId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.USERWORKSPACE_NOT_FOUND));

    if (!userWorkspace.getUser().getId().equals(user.getId())) {
      throw new CustomException(ExceptionStatus.USERWORKSPACE_USER_MISMATCH);
    }

    userWorkspace.setContent(request.getContent());
  }

  @Transactional
  public void changePageTitle(User user, Long pageId, String title) {
    Page page = getPage(pageId, user.getId());

    page.setTitle(title);
    pageRepository.save(page);
  }

  @Transactional
  public void deletePage(User user, Long pageId) {
    Page page = getPage(pageId, user.getId());

    page.setDeleted(true);

    List<Page> deletedPage = new ArrayList<>();
    deletedPage.add(page);

    Queue<Page> pageQueue = new ArrayDeque<>(page.getChild());

    while (!pageQueue.isEmpty()) {
      Page dPage = pageQueue.poll();

      dPage.setDeleted(true);
      deletedPage.add(dPage);

      pageQueue.addAll(dPage.getChild());
    }

    pageRepository.saveAll(deletedPage);

    List<Page> childList = null;
    childList = page.getParent() == null ? pageRepository.findByParentIsNullAndDeletedFalse() : pageRepository.findByParentIdAndDeletedFalse(page.getParent().getId());
    for(int i=0; i<childList.size(); i++) {
      childList.get(i).setOrders((double) i);
    }

    pageRepository.saveAll(childList);
  }

  public String uploadImage(User user, Long pageId, MultipartFile file) {
    Page page = getPage(pageId, user.getId());

    String url = s3Util.uploadVideo(file, "/page" + pageId, LocalDateTime.now().toString());

    return url;
  }

  @Transactional
  public void changePosition(User user, ChangePositionRequest request) {
    Page page = getPage(request.getPageId(), user.getId());

    if (page.isDeleted()) {
      throw new CustomException(ExceptionStatus.PAGE_NOT_FOUND);
    }

    if ((request.getParentPageId().equals(-1L) && page.getParent() == null) ||
        (page.getParent() != null && request.getParentPageId().equals(page.getParent().getId()))) {
      changeOrderCurrentParent(page, request.getParentPageId(), request.getOrder());
    } else {
      changeOrderCurrentAndNextParent(page, request.getParentPageId(), request.getOrder());
    }
  }

  private void changeOrderCurrentAndNextParent(Page page, Long nextParentPageId, int order) {
    Long parentPageId = (page.getParent() == null ? -1L : page.getParent().getId());
    List<Page> childrenPages = getChildrenPages(page, parentPageId);
    childrenPages.remove(page.getOrders().intValue());
    for (int i = 0; i < childrenPages.size(); i++) {
      Page child = childrenPages.get(i);
      child.setOrders((double) i);
    }

    childrenPages = getChildrenPages(page, nextParentPageId);
    childrenPages.add(order, page);
    for (int i = 0; i < childrenPages.size(); i++) {
      Page child = childrenPages.get(i);
      child.setOrders((double) i);
    }

    validateAndUpdateParent(page, nextParentPageId);
  }

  private void validateAndUpdateParent(Page page, Long parentPageId) {
    //최상위 페이지 여부
    if (parentPageId.equals(-1L)) {
      page.setParent(null);
    } else {
      Page nextParentPage = pageRepository.findById(parentPageId)
          .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

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
    if (page.getOrders().equals((double) order)) {
      return;
    }

    List<Page> childrenPages = getChildrenPages(page, parentPageId);
    childrenPages.remove(page.getOrders().intValue());
    childrenPages.add(order, page);
    for (int i = 0; i < childrenPages.size(); i++) {
      Page child = childrenPages.get(i);
      child.setOrders((double) i);
    }
  }

  private List<Page> getChildrenPages(Page page, Long parentPageId) {
    List<Page> childrenPages;
    if (parentPageId.equals(-1L)) {
      childrenPages = pageRepository.findByTeamIdAndDeletedAndParentIsNullOrderByOrders(
          page.getTeam().getId(), false);
    } else {
      childrenPages = pageRepository.findByParentIdAndDeletedOrderByOrders(parentPageId, false);
    }
    return childrenPages;
  }

  @Transactional
  public void updateTags(User user, UpdateTagsRequest request) {
    Page page = getPage(request.getPageId(), user.getId());

    List<WorkspaceTag> prevTagList = workspaceTagRepository.findByWorkspaceId(page.getId());
    List<WorkspaceTag> saveList = new ArrayList<>();

    for (String tagName : request.getTagList()) {
      boolean isPresent = false;
      for (WorkspaceTag prevTag : prevTagList) {
        if (prevTag.getTag().getName().equals(tagName)) {
          prevTagList.remove(prevTag);
          isPresent = true;
          break;
        }
      }
      if (isPresent == false) {
        saveList.add(WorkspaceTag.builder()
            .workspace(page)
            .tag(Tag.fromString(tagName))
            .build());
      }
    }

    workspaceTagRepository.saveAll(saveList);
    workspaceTagRepository.deleteAll(prevTagList);
  }

  private Page getPage(Long pageId, Integer userId) {
    Page page = pageRepository.findById(pageId)
        .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

    userTeamRepository.findByUserIdAndTeamId(userId, page.getTeam().getId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

    return page;
  }
}


