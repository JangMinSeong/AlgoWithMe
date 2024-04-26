package com.ssafy.Algowithme.user.service;

import com.google.common.net.HttpHeaders;
import com.ssafy.Algowithme.auth.util.JwtUtil;
import com.ssafy.Algowithme.user.dto.response.GithubInfoResponse;
import com.ssafy.Algowithme.user.entity.RefreshToken;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.repository.RefreshTokenRedisRepository;
import com.ssafy.Algowithme.user.repository.UserRepository;
import com.ssafy.Algowithme.user.util.GithubOAuth2Utils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRedisRepository redisRepository;
    private final GithubOAuth2Utils githubUtil;
    private final JwtUtil jwtUtil;

    public static long accessTokenValidTime = 3 * 60 * 60 * 1000L;    // 3시간
    public static long refreshTokenValidTime = 15 * 60 * 60 * 24 * 1000L;   // 15일

    public User login(String code, HttpServletResponse response) {
        String gitToken = githubUtil.getGithubToken(code);
        GithubInfoResponse githubInfoResponse = githubUtil.getGithubInfo(gitToken);

        User user =  userRepository.findByGitId(githubInfoResponse.getGitId())
                .orElseGet(() -> userRepository.save(User.builder()
                        .gitToken(gitToken)
                        .gitId(githubInfoResponse.getGitId())
                        .nickname(githubInfoResponse.getLogin())
                        .imageUrl(githubInfoResponse.getImageUrl())
                        .build()));

        String accessToken = jwtUtil.createJwt(user.getId(), user.getRole(), accessTokenValidTime);
        String refreshToken = jwtUtil.createJwt(user.getId(), user.getRole(), refreshTokenValidTime);

        response.addHeader("Authorization", "Bearer " + accessToken);

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

        return user;
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        ResponseCookie responseCookie = ResponseCookie.from("algowithme_refreshToken", null)
                .maxAge(0)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .build();

        Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("algowithme_refreshToken"))
                .findFirst().flatMap(cookie -> redisRepository.findByRefreshToken(cookie.getValue()))
                .ifPresent(redisRepository::delete);

        response.setHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }
}
