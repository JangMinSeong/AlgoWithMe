package com.ssafy.Algowithme.common.dto.request;

import com.ssafy.Algowithme.common.entity.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MarkRequest {
    private int number; // 문제 번호
    private Language language;
    private String code;
}
