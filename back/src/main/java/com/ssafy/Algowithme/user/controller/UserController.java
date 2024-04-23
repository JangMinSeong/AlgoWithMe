package com.ssafy.Algowithme.user.controller;

import com.ssafy.Algowithme.auth.config.JwtTokenProvider;
import com.ssafy.Algowithme.user.dto.request.LoginRequest;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public UserInfoResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User userInfo = userService.getUserInfo(request.getCode());

        jwtTokenProvider.setRefreshTokenForClient(response, userInfo);
        jwtTokenProvider.setAccessTokenForClient(response, userInfo);

        return UserInfoResponse.builder()
                .id(userInfo.getId())
                .nickname(userInfo.getNickname())
                .imageUrl(userInfo.getImageUrl())
                .build();
    }
}
