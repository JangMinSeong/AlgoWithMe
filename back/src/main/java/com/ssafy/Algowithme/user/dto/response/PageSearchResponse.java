package com.ssafy.Algowithme.user.dto.response;

import com.ssafy.Algowithme.user.dto.SearchPageDto;
import com.ssafy.Algowithme.user.dto.SearchStudyDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PageSearchResponse {

  private List<SearchStudyDto> studies;
  private List<SearchPageDto> pages;
}
