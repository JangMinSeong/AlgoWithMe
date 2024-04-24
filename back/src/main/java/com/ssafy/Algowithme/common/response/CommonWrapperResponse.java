package com.ssafy.Algowithme.common.response;

import lombok.Builder;

@Builder
public record CommonWrapperResponse (

        Integer status,
        Object data
){}
