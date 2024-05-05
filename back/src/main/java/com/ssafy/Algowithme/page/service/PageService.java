package com.ssafy.Algowithme.page.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.dto.request.CreateDocsRequest;
import com.ssafy.Algowithme.page.dto.response.CreateDocsResponse;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.code.util.BOJUtil;
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

    private final BOJUtil bojUtil;

    public ProblemResponse getProblemInfo(String provider, Integer problemId) {

        if(provider.equals("boj")) {
            return new ProblemResponse(bojUtil.getBOJByNumber(problemId));
        } else {
            return null;
        }
    }

    @Transactional
    public CreateDocsResponse createDocs(CreateDocsRequest request) {
        //팀 조회
        Team team = null;
        if(request.getTeamId() != null) {
            team = teamRepository.findById(request.getTeamId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));
        }

        //상위 페이지가 존재하는 경우
        Page parentPage = null;
        if(request.getPageId() != -1) {
            parentPage = pageRepository.findById(request.getPageId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        }

        //페이지(워크 스페이스) 생성 및 저장
        Page page = pageRepository.save(Page.builder()
                    .team(team)
                    .parent(parentPage)
                    .title(request.getTitle())
                    .content(request.getContent())
                    .orders(request.getOrders())
                    .build());

        return new CreateDocsResponse(page.getId());
    }
}


