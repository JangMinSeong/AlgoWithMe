package com.ssafy.Algowithme.page.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTagsRequest {

  private Long pageId;
  private List<String> tagList;
}
