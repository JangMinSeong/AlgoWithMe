package com.ssafy.Algowithme.common.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostSWEARequest {
    private String code;
    private int limit_time;
    private String input;
    private String output;
}
