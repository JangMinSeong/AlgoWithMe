package com.ssafy.Algowithme.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionStatus {

    PAGE_NOT_FOUND(1200, "페이지가 존재하지 않습니다."),
    PERSONAL_CODE_NOT_FOUND(1001, "코드가 존재하지 않습니다."),
    PROBLEM_NOT_FOUND(1400, "문제가 존재하지 않습니다."),
    USER_NOT_FOUND(1000, "유저가 존재하지 않습니다."),
    USER_MISMATCH(1003, "사용자가 일치하지 않습니다."),
    TEAM_NOT_FOUND(1100, "팀이 존재하지 않습니다."),
    ;

    private final int code;
    private final String message;
}
