package com.ssafy.Algowithme.page.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateDocsRequest {
    private Long teamId;
    private Long pageId;
    private String title;
    private String content;
    private Double orders;
}
