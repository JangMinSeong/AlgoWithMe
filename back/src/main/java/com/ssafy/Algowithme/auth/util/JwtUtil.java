package com.ssafy.Algowithme.auth.util;

import com.ssafy.Algowithme.auth.type.JwtCode;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.RefreshToken;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.repository.RefreshTokenRedisRepository;
import com.ssafy.Algowithme.user.type.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Set;

@Component
@Slf4j
public class JwtUtil {

  private Key secretKey;
  private final UserDetailsService userDetailsService;
  private final RefreshTokenRedisRepository redisRepository;

  public JwtUtil(@Value("${jwt.secret.key}") String secretKey,
                 UserDetailsService userDetailsService,
                 RefreshTokenRedisRepository redisRepository) {
    this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    this.userDetailsService = userDetailsService;
    this.redisRepository = redisRepository;
  }

  public static long accessTokenValidTime = 3 * 60 * 60 * 1000L;    // 3시간
  public static long refreshTokenValidTime = 15 * 60 * 60 * 24 * 1000L;   // 15일

  public Integer getUserId(String token) {
    return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody()
        .get("userId", Integer.class);
  }

  public String getRole(String token) {

    return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody()
        .get("role", String.class);
  }

  public Boolean isExpired(String token) {

    return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody()
        .getExpiration().before(new Date());
  }

  public String createJwt(Integer userId, Set<Role> role, Long expiredMs) {

    Claims claims = Jwts.claims();
    claims.put("userId", userId);
    claims.put("role", role);

    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
        .signWith(secretKey, SignatureAlgorithm.HS256)
        .compact();
  }

  public Authentication getAuthentication(String token) {
    String userId = String.valueOf(this.getUserId(token));

    UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
  }

  public JwtCode validateToken(String token) {
    if (token == null) {
      return JwtCode.DENIED;
    }

    try {
      Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
      return JwtCode.ACCESS;
    } catch (ExpiredJwtException e) {
      return JwtCode.EXPIRED;
    } catch (JwtException | IllegalArgumentException e) {
      return JwtCode.DENIED;
    }
  }

  public void setUserTokens(HttpServletResponse response, User user) {
    String accessToken = createJwt(user.getId(), user.getRole(), accessTokenValidTime);
    String refreshToken = createJwt(user.getId(), user.getRole(), refreshTokenValidTime);

    response.addHeader("Authorization", "Bearer " + accessToken);

    log.info("Authorization : Bearer " + accessToken);

    Cookie cookie = new Cookie("algowithme_refreshToken", refreshToken);
    cookie.setMaxAge((int) (refreshTokenValidTime / 1000));
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    cookie.setPath("/");

    response.addCookie(cookie);
    redisRepository.save(RefreshToken.builder()
        .id(user.getId())
        .refreshToken(refreshToken)
        .build());
  }

  public UserInfoResponse refreshAccessToken(HttpServletResponse response, String refreshToken) {
    if (IsNotValidaRefreshToken(refreshToken)) {
      throw new CustomException(ExceptionStatus.REFRESH_TOKEN_IS_NOT_VALID);
    }

    User user = (User) userDetailsService.loadUserByUsername(
        String.valueOf(getUserId(refreshToken)));

    setUserTokens(response, user);

    return UserInfoResponse.builder()
        .id(user.getId())
        .nickname(user.getNickname())
        .imageUrl(user.getImageUrl())
        .build();
  }

  public boolean IsNotValidaRefreshToken(String refreshToken) {
    return refreshToken == null
        || redisRepository.findByRefreshToken(refreshToken).isEmpty()
        || validateToken(refreshToken) != JwtCode.ACCESS;
  }
}
