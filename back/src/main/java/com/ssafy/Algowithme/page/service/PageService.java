package com.ssafy.Algowithme.page.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.dto.request.CreateDocsPageRequest;
import com.ssafy.Algowithme.page.dto.request.CreateProblemPageRequest;
import com.ssafy.Algowithme.page.dto.request.UpdatePagePositionRequest;
import com.ssafy.Algowithme.page.dto.response.CreateDocsPageResponse;
import com.ssafy.Algowithme.page.dto.response.CreateProblemPageResponse;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.code.util.BOJUtil;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PageService {

    private final TeamRepository teamRepository;
    private final PageRepository pageRepository;
    private final ProblemRepository problemRepository;
    private final RawProblemRepository rawProblemRepository;

    private final BOJUtil bojUtil;

    public ProblemResponse getProblemInfo(String provider, Integer problemId) {

        if(provider.equals("boj")) {
            return new ProblemResponse(bojUtil.getBOJByNumber(problemId));
        } else {
            return null;
        }
    }

    @Transactional
    public CreateDocsPageResponse createDocsPage(CreateDocsPageRequest request) {
        //팀 조회
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        //상위 페이지가 존재하는 경우
        Page parentPage = null;
        if(!request.getPageId().equals(-1L)) {
            parentPage = pageRepository.findById(request.getPageId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        }

        //순서
        Double order = 0.0;
        if(parentPage != null) {
            order = Double.valueOf(pageRepository.countByTeamIdAndParentId(team.getId(), parentPage.getId()));
        } else {
            order = Double.valueOf(pageRepository.countByTeamIdAndParentIsNull(team.getId()));
        }

        //페이지(워크 스페이스) 생성 및 저장
        Page page = pageRepository.save(Page.builder()
                        .team(team)
                        .parent(parentPage)
                        .order(order)
                        .build());

        return new CreateDocsPageResponse(page.getId());
    }

    public CreateProblemPageResponse createProblemPage(CreateProblemPageRequest request) {
        //팀 조회
        Team team = null;
        if(request.getTeamId() != null) {
            team = teamRepository.findById(request.getTeamId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));
        }

        //상위 페이지가 존재하는 경우
        Page parentPage = null;
        if(!request.getPageId().equals(-1L)) {
            parentPage = pageRepository.findById(request.getPageId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        }

        //상위 페이지가 존재하는 경우
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
        RawProblem rawProblem = rawProblemRepository.findBySiteAndNumber(problem.getProvider().getName(), problem.getNumber())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //페이지(워크 스페이스) 생성 및 저장
        Page page = pageRepository.save(Page.builder()
                        .team(team)
                        .parent(parentPage)
                        .problem(problem)
                        .title(rawProblem.getTitle())
                        .content(rawProblem.getContent())
                        .build());

        return new CreateProblemPageResponse(page.getId(), page.getTitle(), page.getContent());
    }

    public void updatePosition(UpdatePagePositionRequest request) {

    }
}


