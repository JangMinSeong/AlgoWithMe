package com.ssafy.Algowithme.problem.dto.response;

import com.ssafy.Algowithme.problem.entity.Problem;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllProblemResponse {

  private List<Problem> problemList;

  public static AllProblemResponse create(List<Problem> problemList) {
    return AllProblemResponse.builder().problemList(problemList).build();
  }
}
