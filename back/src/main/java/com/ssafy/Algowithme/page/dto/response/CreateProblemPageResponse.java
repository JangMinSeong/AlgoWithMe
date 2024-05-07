package com.ssafy.Algowithme.page.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProblemPageResponse {
    private Long pageId;
    private String title;
    private String content;
}
