package com.ssafy.Algowithme.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionStatus {

    // user(10)
    GITHUB_TOKEN_NOT_FOUND(1000, "Github Access Token을 가져올 수 없습니다."),
    GITHUB_USER_NOT_FOUND(1001, "해당 유저의 정보를 가져올 수 없습니다."),
    REFRESH_TOKEN_IS_NOT_VALID(1002, "Refresh Token이 유효하지 않습니다."),
    USER_MISMATCH(1003, "사용자가 일치하지 않습니다."),
    USER_NOT_FOUND(1004, "유저가 존재하지 않습니다."),
    AUTHORIZATION_USER_NOT_FOUNT(1005, "Authorization에 해당하는 사용자를 찾을 수 없습니다."),

    // team(11)
    TEAM_NOT_FOUND(1100, "팀이 존재하지 않습니다."),
    TEAM_INVITE_URL_EXPIRED(1101, "초대 링크가 유효하지 않습니다."),
    TEAM_INVITE_UNAUTHORIZED(1102, "초대 권한이 없습니다."),

    // page(12)
    PAGE_NOT_FOUND(1200, "페이지가 존재하지 않습니다."),

    // code(13),
    PERSONAL_CODE_NOT_FOUND(1300, "코드가 존재하지 않습니다."),

    //problem(14)
    PROBLEM_NOT_FOUND(1400, "문제가 존재하지 않습니다."),

    //openvidu/websocket(15)

    //github(16)

    //aes128(17)
    ENCRYPTION_FAILED(1700, "암호화에 실패했습니다."),
    DECRYPTION_FAILED(1701, "복호화에 실패했습니다."),
    ;

    private final int code;
    private final String message;
}
