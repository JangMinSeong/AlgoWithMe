package com.ssafy.Algowithme.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeByPageAndUserResponse {

  private List<Long> codeIds;
  private PersonalCodeResponse code;
}
