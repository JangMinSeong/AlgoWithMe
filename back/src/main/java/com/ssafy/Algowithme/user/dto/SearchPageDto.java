package com.ssafy.Algowithme.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchPageDto {

  private Long id;
  private Long studyId;
  private boolean isDoc;
  private String name;
  private String imageUrl;
}
