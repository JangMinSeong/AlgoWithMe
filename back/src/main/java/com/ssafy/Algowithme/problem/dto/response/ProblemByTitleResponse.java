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

  private int resultCount;    // 조회 결과 수
  private int page;           // 페이지 번호
  private int totalPages;     // 전체 페이지 번호
  private List<ProblemInfo> problemInfoList;  //문제 리스트

  public static ProblemByTitleResponse create(int resultCount, int page, int totalPages,
                                              List<ProblemInfo> problemInfoList) {
    return ProblemByTitleResponse.builder()
        .resultCount(resultCount)
        .page(page)
        .totalPages(totalPages)
        .problemInfoList(problemInfoList)
        .build();
  }
}
