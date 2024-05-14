package com.ssafy.Algowithme.team.dto;

import com.ssafy.Algowithme.problem.type.Provider;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProblemRawDto {

    private Long candidateId;
    private Long problemId;
    private String url;
    private Provider provider;
    private int number;
    private String name;
    private String level;
}
