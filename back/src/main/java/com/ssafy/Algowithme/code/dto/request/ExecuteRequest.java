package com.ssafy.Algowithme.code.dto.request;

import com.ssafy.Algowithme.code.type.Language;
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
