package com.ssafy.Algowithme.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.Algowithme.auth.type.JwtCode;
import com.ssafy.Algowithme.auth.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

  private final JwtUtil jwtUtil;
  private final ObjectMapper objectMapper;

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
                     AccessDeniedException accessDeniedException) throws IOException, ServletException {
    String authorization = request.getHeader("Authorization");

    JwtCode jwtCode;
    if (authorization == null || !authorization.startsWith("Bearer ")) {
      jwtCode = JwtCode.DENIED;
    } else {
      jwtCode = jwtUtil.validateToken(authorization.split(" ")[1]);
    }

    response.setContentType("application/json");
    response.setStatus(getStatusInfo(jwtCode));
    response.getWriter().write(objectMapper.writeValueAsString(getErrorMessageMap(jwtCode)));
  }

  private int getStatusInfo(JwtCode jwtCode) {
    if (jwtCode == JwtCode.ACCESS) {
      return HttpStatus.FORBIDDEN.value();
    }
    return HttpStatus.UNAUTHORIZED.value();
  }

  private Map<String, String> getErrorMessageMap(JwtCode jwtCode) {
    Map<String, String> errorMsg = new LinkedHashMap<>();

    switch (jwtCode) {
      case ACCESS:
        errorMsg.put("message", "권한이 없습니다.");
        errorMsg.put("errorType", "AccessDeniedException");
      case EXPIRED:
        errorMsg.put("message", "토큰이 만료되었습니다.");
        errorMsg.put("errorType", "TokenExpiredException");
      case DENIED:
        errorMsg.put("message", "토큰이 유효하지 않습니다.");
        errorMsg.put("errorType", "TokenInvalidException");
    }

    return errorMsg;
  }
}
