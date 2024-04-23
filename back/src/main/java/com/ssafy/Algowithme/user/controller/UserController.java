package com.ssafy.Algowithme.user.controller;

import com.ssafy.Algowithme.auth.config.JwtTokenProvider;
import com.ssafy.Algowithme.auth.response.JwtTokenResponse;
import com.ssafy.Algowithme.user.dto.request.LoginRequest;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Value("${github.login.url}")
    private String loginUrl;

    @Value("${github.client.id}")
    private String clientId;

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public JwtTokenResponse login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User userInfo = userService.getUserInfo(request.getCode());

        jwtTokenProvider.setRefreshTokenForClient(response, userInfo);
        return jwtTokenProvider.makeJwtTokenResponse(userInfo);
    }

    @GetMapping("/login")
    public RedirectView login() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(loginUrl + clientId);
        return redirectView;
    }

    @GetMapping("/land")
    public String land() {
        return "landing page";
    }

    @GetMapping("/main")
    public String mp() {
        return "main page";
    }
}
