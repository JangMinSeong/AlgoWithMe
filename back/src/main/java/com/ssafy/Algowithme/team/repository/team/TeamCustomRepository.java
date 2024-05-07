package com.ssafy.Algowithme.team.repository.team;

import com.ssafy.Algowithme.team.dto.CandidateProblemDto;
import com.ssafy.Algowithme.team.dto.RankDto;
import com.ssafy.Algowithme.team.dto.SolvedProblemDto;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;

import java.util.List;

public interface TeamCustomRepository {

    List<SolvedTagCountDto> getSolvedTagChart(Long teamId);

    List<SolvedProblemDto> getSolvedProblem(Long teamId);

    List<CandidateProblemDto> getCandidateProblem(Long teamId);

    List<RankDto> getRank(Long teamId);
}
