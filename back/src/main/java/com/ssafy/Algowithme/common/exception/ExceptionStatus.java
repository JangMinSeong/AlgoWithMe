package com.ssafy.Algowithme.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionStatus {

    PAGE_NOT_FOUND(1000, "페이지가 존재하지 않습니다."),
    PERSONAL_CODE_NOT_FOUND(1001, "코드가 존재하지 않습니다.")
    ;

    private final int code;
    private final String message;
}
