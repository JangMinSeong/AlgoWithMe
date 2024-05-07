package com.ssafy.Algowithme.team.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.team.dto.request.CreateTeamRequest;
import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.dto.response.TeamInfoDetailResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoResponse;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.CandidateProblemRepository;
import com.ssafy.Algowithme.team.repository.team.TeamRepository;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.entity.UserTeam;
import com.ssafy.Algowithme.user.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;
    private final ProblemRepository problemRepository;
    private final CandidateProblemRepository candidateProblemRepository;

    public TeamInfoResponse createTeam(User user, CreateTeamRequest request) {
        //팀 생성
        Team team = teamRepository.save(Team.builder()
                        .name(request.getName())
                        .canRead(false)
                        .imageUrl(request.getImageUrl())
                        .build());
        //팀멤버 저장
        userTeamRepository.save(UserTeam.builder()
                        .user(user)
                        .team(team)
                        .manager(true)
                        .build());

        return TeamInfoResponse.create(team);
    }

    public void addCandidateProblem(ProblemAddRequest request) {
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
    }

    public TeamInfoDetailResponse getTeamInfoDetail(User user, Long teamId) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        return TeamInfoDetailResponse.builder()
                .teamId(teamId)
                .joinDay((int) Duration.between(userTeam.getCreatedAt(), LocalDateTime.now()).toDays())
                .chart(teamRepository.getSolvedTagChart(teamId))
                .solvedProblems(teamRepository.getSolvedProblem(teamId))
                .candidateProblems(teamRepository.getCandidateProblem(teamId))
                .ranking(teamRepository.getRank(teamId))
                .build();
    }
}
