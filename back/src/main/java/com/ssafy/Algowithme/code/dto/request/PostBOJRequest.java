package com.ssafy.Algowithme.code.dto.request;

import com.ssafy.Algowithme.problem.dto.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostBOJRequest {

  private String code;
  private int limit_time;
  private List<TestCase> test_cases;
}
