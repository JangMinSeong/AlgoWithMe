package com.ssafy.Algowithme.team.dto;

import com.ssafy.Algowithme.problem.type.Provider;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedProblemDto {

    private long pageId;
    private long problemId;
    private String url;
    private Provider provider;
    private int number;
    private String name;
    private String level;
}
