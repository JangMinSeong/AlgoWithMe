package com.ssafy.Algowithme.page.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemoRequest {

  private Long userWorkspaceId;
  private String content;
}
