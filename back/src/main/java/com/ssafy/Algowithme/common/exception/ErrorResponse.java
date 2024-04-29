package com.ssafy.Algowithme.common.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorResponse  {
    private final int code;
    private final String message;
    private final LocalDateTime timestamp;

    public ErrorResponse(ExceptionStatus status) {
        this.code = status.getCode();
        this.message = status.getMessage();
        this.timestamp = LocalDateTime.now();
    }
}
