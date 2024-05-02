package com.ssafy.Algowithme.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionStatus {

    // user_controller
    GITHUB_TOKEN_NOT_FOUND(1000, "Github Access Token을 가져올 수 없습니다."),
    GITHUB_USER_NOT_FOUND(1001, "해당 유저의 정보를 가져올 수 없습니다."),
    REFRESH_TOKEN_IS_NOT_VALID(1002, "Refresh Token이 유효하지 않습니다."),

    // code_controller
    PAGE_NOT_FOUND(1000, "페이지가 존재하지 않습니다."),
    PERSONAL_CODE_NOT_FOUND(1001, "코드가 존재하지 않습니다."),
    PROBLEM_NOT_FOUND(1002, "문제가 존재하지 않습니다."),
    USER_MISMATCH(1003, "사용자가 일치하지 않습니다.")
    ;

    private final int code;
    private final String message;
}
