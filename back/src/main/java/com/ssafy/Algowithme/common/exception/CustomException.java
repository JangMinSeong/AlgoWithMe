package com.ssafy.Algowithme.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ExceptionStatus exceptionStatus;

    public CustomException(ExceptionStatus exceptionStatus) {
        super(exceptionStatus.getMessage());
        this.exceptionStatus = exceptionStatus;
    }
}
