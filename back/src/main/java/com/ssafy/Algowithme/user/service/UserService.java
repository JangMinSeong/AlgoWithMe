package com.ssafy.Algowithme.user.service;

import com.ssafy.Algowithme.auth.util.JwtUtil;
import com.ssafy.Algowithme.user.dto.TeamListDto;
import com.ssafy.Algowithme.user.dto.response.GithubInfoResponse;
import com.ssafy.Algowithme.user.dto.response.UserInfoDetailResponse;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.repository.RefreshTokenRedisRepository;
import com.ssafy.Algowithme.user.repository.user.UserRepository;
import com.ssafy.Algowithme.user.util.GithubOAuth2Utils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRedisRepository redisRepository;
    private final GithubOAuth2Utils githubUtil;
    private final JwtUtil jwtUtil;

    @Transactional
    public UserInfoResponse login(String code, HttpServletResponse response) {
        String gitToken = githubUtil.getGithubToken(code);
        GithubInfoResponse githubInfoResponse = githubUtil.getGithubInfo(gitToken);

        Optional<User> usercheck =  userRepository.findByGitId(githubInfoResponse.getGitId());

        User user;

        if(usercheck.isEmpty()){
            user = userRepository.save(User.builder()
                    .gitToken(gitToken)
                    .gitId(githubInfoResponse.getGitId())
                    .nickname(githubInfoResponse.getLogin())
                    .imageUrl(githubInfoResponse.getImageUrl())
                    .build());
        }else {
            user = usercheck.get();

            user.setGitToken(gitToken);
            user.setNickname(githubInfoResponse.getLogin());
            user.setImageUrl(githubInfoResponse.getImageUrl());

            userRepository.save(user);
        }

        jwtUtil.setUserTokens(response, user);

        return UserInfoResponse.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .imageUrl(user.getImageUrl())
                .build();
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

    public UserInfoDetailResponse getUserInfoDetail(User user) {
        return UserInfoDetailResponse.builder()
                .id(user.getId())
                .chart(userRepository.getSolvedTagChart(user.getId()))
                .problems(userRepository.getStudiedProblem(user.getId()))
                .teams(userRepository.getRecentTeam(user.getId()))
                .build();
    }

    public List<TeamListDto> getTeamList(User user) {
        return userRepository.getUserTeam(user.getId());
    }
}
