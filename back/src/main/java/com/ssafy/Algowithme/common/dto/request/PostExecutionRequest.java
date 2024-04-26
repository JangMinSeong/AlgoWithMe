package com.ssafy.Algowithme.common.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostExecutionRequest {
    private String code;
    private String input;
}
