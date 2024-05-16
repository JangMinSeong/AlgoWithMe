package com.ssafy.Algowithme.code.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListDirectoryRequest {

  private String repo;
  private String branch;
  private String path;
}
