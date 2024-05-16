package com.ssafy.Algowithme.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandlerAdvice {

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(CustomException.class)
  public ErrorResponse badRequestExceptionHandler(CustomException e) {
    return new ErrorResponse(e.getExceptionStatus());
  }

}
