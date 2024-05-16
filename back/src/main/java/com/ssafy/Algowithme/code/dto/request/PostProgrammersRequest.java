package com.ssafy.Algowithme.code.dto.request;

import com.ssafy.Algowithme.problem.dto.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PostProgrammersRequest {

  private String main;
  private String solution;
  private List<TestCase> test_cases;
}
