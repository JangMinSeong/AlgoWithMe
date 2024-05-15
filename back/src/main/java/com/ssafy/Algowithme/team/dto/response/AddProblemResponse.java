package com.ssafy.Algowithme.team.dto.response;

import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.type.Provider;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddProblemResponse {
    private Long candidateId;
    private Long problemId;
    private String url;
    private String provider;
    private int number;
    private String name;
    private String level;

    public static AddProblemResponse create(CandidateProblem candidateProblem) {
        Problem problem = candidateProblem.getProblem();

        return AddProblemResponse.builder()
                .candidateId(candidateProblem.getId())
                .problemId(problem.getId())
                .url(problem.getUrl())
                .provider(problem.getProvider().getName())
                .number(problem.getNumber())
                .name(problem.getName())
                .level(problem.getLevel())
                .build();
    }
}
