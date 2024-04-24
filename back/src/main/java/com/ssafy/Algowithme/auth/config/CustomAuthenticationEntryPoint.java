package com.ssafy.Algowithme.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.Algowithme.auth.type.JwtCode;
import com.ssafy.Algowithme.common.response.CommonWrapperResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String token = jwtTokenProvider.resolveToken(request);
        JwtCode jwtCode = jwtTokenProvider.validateToken(token);

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        CommonWrapperResponse errorMessage = getErrorMessage(jwtCode);
        response.getWriter().write(objectMapper.writeValueAsString(errorMessage));
    }

    private static CommonWrapperResponse getErrorMessage(JwtCode jwtCode) {
        Map<String, String> errorMessage = new LinkedHashMap<>();

        switch (jwtCode) {
            case ACCESS:
                errorMessage.put("message", "권한이 없습니다.");
                errorMessage.put("errorType", "AccessDeniedException");
            case EXPIRED:
                errorMessage.put("message", "토큰이 만료되었습니다.");
                errorMessage.put("errorType", "TokenExpiredException");
            case DENIED:
                errorMessage.put("message", "토큰이 유효하지 않습니다.");
                errorMessage.put("errorType", "TokenInvalidException");
        }

        errorMessage.put("fieldName", "");

        return CommonWrapperResponse.builder()
                .status(HttpServletResponse.SC_UNAUTHORIZED)
                .data(errorMessage)
                .build();
    }
}
