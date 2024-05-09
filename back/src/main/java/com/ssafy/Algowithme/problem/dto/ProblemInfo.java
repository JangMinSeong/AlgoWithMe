package com.ssafy.Algowithme.problem.dto;

import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.type.Provider;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemInfo {
    private Long problemId;     // problem 고유 번호
    private String provider;  // 사이트명
    private int number;         // 문제 번호
    private String title;       // 문제 제목
    private String level;       // 문제 레벨
    private String url;         // 문제 url

    public static ProblemInfo create(Problem problem) {
        return ProblemInfo.builder()
                .problemId(problem.getId())
                .provider(problem.getProvider().getName())
                .number(problem.getNumber())
                .title(problem.getName())
                .level(problem.getLevel())
                .url(problem.getUrl())
                .build();
    }
}
