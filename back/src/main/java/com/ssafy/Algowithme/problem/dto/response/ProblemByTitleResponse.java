package com.ssafy.Algowithme.problem.dto.response;

import com.ssafy.Algowithme.problem.dto.ProblemInfo;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemByTitleResponse {
    private List<ProblemInfo> problemInfoList;

    public static ProblemByTitleResponse create(List<ProblemInfo> problemInfoList) {
        return ProblemByTitleResponse.builder()
                .problemInfoList(problemInfoList)
                .build();
    }
}
