package com.ssafy.Algowithme.common.dto.request;

import com.ssafy.Algowithme.common.entity.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExecuteRequest {
    private Language language;
    private String code;
    private String input;
}
