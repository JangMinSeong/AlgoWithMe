package com.ssafy.Algowithme.page.dto.response;

import com.ssafy.Algowithme.problem.dto.EditCode;
import com.ssafy.Algowithme.problem.dto.TestCase;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProblemPageResponse {

  private Long pageId;
  private String site;
  private int number;
  private String title;
  private String content;
  private List<TestCase> exampleList;
  private List<EditCode> editCodesList;

  public static CreateProblemPageResponse create(Long pageId, RawProblem rawProblem) {
    return CreateProblemPageResponse.builder()
        .pageId(pageId)
        .site(rawProblem.getSite())
        .number(rawProblem.getNumber())
        .title(rawProblem.getTitle())
        .content(rawProblem.getContent())
        .exampleList(rawProblem.getExampleList())
        .editCodesList(rawProblem.getEditCodesList())
        .build();
  }
}
