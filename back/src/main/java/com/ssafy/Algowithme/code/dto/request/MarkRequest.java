package com.ssafy.Algowithme.code.dto.request;

import com.ssafy.Algowithme.code.type.Language;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MarkRequest {
    private String uid; // 문제 mongoDB id
    private Language language;
    private String code;
}
