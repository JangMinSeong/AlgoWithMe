package com.ssafy.Algowithme.common.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import org.springframework.http.HttpStatus;

@Builder
public record ErrorResponse(

        String errorType,
        String message,
        String fieldName,

        @JsonIgnore
        HttpStatus status
){}
