package com.ssafy.Algowithme.auth.response;

import lombok.Builder;

@Builder
public record JwtTokenResponse (

    String accessToken,
    String tokenType
) {}
