package com.ssafy.Algowithme.auth.config;

import com.ssafy.Algowithme.auth.type.JwtCode;
import com.ssafy.Algowithme.auth.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    try {
      String authorization = request.getHeader("Authorization");

      if (authorization == null || !authorization.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
      }

      String token = authorization.split(" ")[1];

      JwtCode jwtCode = jwtUtil.validateToken(token);

      if (jwtCode == JwtCode.ACCESS) {
        Authentication authToken = jwtUtil.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authToken);
      } else {
        throw new ServletException("Invalild JWT Token");
      }
    } catch (Exception e) {
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
      response.getWriter().write("Unauthorized: " + e.getMessage());
      return;
    }

    filterChain.doFilter(request, response);
  }
}
