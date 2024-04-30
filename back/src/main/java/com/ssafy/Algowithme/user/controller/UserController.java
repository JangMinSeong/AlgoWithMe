package com.ssafy.Algowithme.user.controller;

import com.ssafy.Algowithme.user.dto.request.LoginRequest;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public UserInfoResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User userInfo = userService.login(request.getCode(), response);

        return UserInfoResponse.builder()
                .id(userInfo.getId())
                .nickname(userInfo.getNickname())
                .imageUrl(userInfo.getImageUrl())
                .build();
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logout(request, response);
    }
}
