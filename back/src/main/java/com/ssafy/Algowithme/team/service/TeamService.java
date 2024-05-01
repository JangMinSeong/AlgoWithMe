package com.ssafy.Algowithme.team.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.CandidateProblemRepository;
import com.ssafy.Algowithme.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final ProblemRepository problemRepository;
    private final CandidateProblemRepository candidateProblemRepository;


    public ResponseEntity<?> addCandidateProblem(ProblemAddRequest request) {
        //팀 조회
        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        //문제 조회
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //문제 후보 추가
        candidateProblemRepository.save(CandidateProblem.builder()
                                            .team(team)
                                            .problem(problem)
                                            .build());

        return ResponseEntity.ok("Success");
    }
}
