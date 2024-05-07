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
import com.ssafy.Algowithme.team.repository.team.TeamRepository;
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

        //페이지 저장
        Page page = getPage(team, request.getPageId());

        return new CreateDocsPageResponse(page.getId());
    }

    @Transactional
    public CreateProblemPageResponse createProblemPage(CreateProblemPageRequest request) {
        //팀 조회
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        //페이지 저장
        Page page = getPage(team, request.getPageId());

        //문제 조회
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
        RawProblem rawProblem = rawProblemRepository.findBySiteAndNumber(problem.getProvider().getName(), problem.getNumber())
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

    public void updatePosition(UpdatePagePositionRequest request) {

    }
}


