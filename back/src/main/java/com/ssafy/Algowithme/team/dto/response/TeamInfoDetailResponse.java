package com.ssafy.Algowithme.team.dto.response;

import com.ssafy.Algowithme.team.dto.CandidateProblemDto;
import com.ssafy.Algowithme.team.dto.RankDto;
import com.ssafy.Algowithme.team.dto.SolvedProblemDto;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamInfoDetailResponse {

    private Long teamId;
    private int joinDay;
    private List<SolvedTagCountDto> chart;
    private List<SolvedProblemDto> solvedProblems;
    private List<CandidateProblemDto> candidateProblems;
    private List<RankDto> ranking;
}
