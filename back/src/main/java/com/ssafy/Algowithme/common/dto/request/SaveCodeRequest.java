package com.ssafy.Algowithme.common.dto.request;

import com.ssafy.Algowithme.common.entity.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SaveCodeRequest {
    private Long codeId;
    private Language language;
    private String code;
}
