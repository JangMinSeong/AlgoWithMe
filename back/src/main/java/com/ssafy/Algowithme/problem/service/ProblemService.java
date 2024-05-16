package com.ssafy.Algowithme.problem.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.entity.WorkspaceTag;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.page.repository.WorkspaceTagRepository;
import com.ssafy.Algowithme.problem.dto.ProblemInfo;
import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTagsResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTitleResponse;
import com.ssafy.Algowithme.problem.dto.response.RawProblemResponse;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import com.ssafy.Algowithme.problem.type.Tag;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.entity.UserProblem;
import com.ssafy.Algowithme.user.repository.UserProblemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProblemService {

  private final ProblemRepository problemRepository;
  private final RawProblemRepository rawProblemRepository;
  private final UserProblemRepository userProblemRepository;
  private final WorkspaceTagRepository workspaceTagRepository;
  private final PageRepository pageRepository;

  public ResponseEntity<AllProblemResponse> getAll() {
    List<Problem> problemList = problemRepository.findAll();
    return ResponseEntity.ok(AllProblemResponse.create(problemList));
  }

  public RawProblemResponse getProblem(Long pageId) {
    Page page = pageRepository.findById(pageId)
        .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

    if (page.getProblem() == null) {
      throw new CustomException(ExceptionStatus.NOT_PROBLEM_PAGE);
    }

    Problem problem = problemRepository.findById(page.getProblem().getId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
    RawProblem rawProblem = rawProblemRepository.findById(problem.getUid())
        .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

    List<WorkspaceTag> workspaceTags = workspaceTagRepository.findByWorkspaceId(pageId);

    return RawProblemResponse.create(rawProblem, workspaceTags);
  }

  public ProblemByTitleResponse getProblemByTitle(String title, int page) {
    List<Problem> problemList = problemRepository.findByNameContaining(title);
    if (problemList.size() == 0) {
      return ProblemByTitleResponse.create(0, 1, 1, new ArrayList<>());
    }

    int resultCount = problemList.size();

    int totalPages = resultCount / 10 + (resultCount % 10 == 0 ? 0 : 1);

    List<ProblemInfo> problemInfoList = new ArrayList<>();
    int startNum = 10 * (page - 1);
    for (int i = startNum; i < startNum + 10 && i < problemList.size(); i++) {
      Problem problem = problemList.get(i);
      problemInfoList.add(ProblemInfo.create(problem));
    }

    return ProblemByTitleResponse.create(resultCount, page, totalPages, problemInfoList);
  }

  public ProblemByTagsResponse getProblemByTag(String levels, int page) {
    String[] levelList = levels.split(" ");
    if (levelList.length == 0) {
      return ProblemByTagsResponse.create(0, 1, 1, new ArrayList<>());
    }

    List<Problem> problemList = problemRepository.findByLevelInOrderByLevel(levelList);
    if (problemList.size() == 0) {
      return ProblemByTagsResponse.create(0, 1, 1, new ArrayList<>());
    }

    int resultCount = problemList.size();

    int totalPages = resultCount / 10 + (resultCount % 10 == 0 ? 0 : 1);

    List<ProblemInfo> problemInfoList = new ArrayList<>();
    int startNum = 10 * (page - 1);
    for (int i = startNum; i < startNum + 10 && i < problemList.size(); i++) {
      Problem problem = problemList.get(i);
      problemInfoList.add(ProblemInfo.create(problem));
    }

    return ProblemByTagsResponse.create(resultCount, page, totalPages, problemInfoList);
  }

  @Transactional
  public void storeProblemSolvingHistory(User user, Long pageId) {
    Page page = pageRepository.findById(pageId)
        .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

    Problem problem = problemRepository.findById(page.getProblem().getId())
        .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

    Optional<UserProblem> userProblem = userProblemRepository.findByUserIdAndProblemId(user.getId(),
        problem.getId());

    if (userProblem.isEmpty()) {
      userProblemRepository.save(UserProblem.builder()
          .user(user)
          .problem(problem)
          .build());
    }
  }
}
