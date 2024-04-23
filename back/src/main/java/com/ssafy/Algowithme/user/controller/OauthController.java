package com.ssafy.Algowithme.user.controller;

import com.ssafy.Algowithme.user.dto.response.GithubInfoResponse;
import com.ssafy.Algowithme.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login/oauth2")
public class OauthController {

    private final UserRepository userRepository;

    @GetMapping("/code/github")
    public GithubInfoResponse githubLogin(@RequestParam String code) {
//        String accessToken = oauthService.getGithubToken(code);
//        return oauthService.getGithubInfo(accessToken);
        return null;
    }
}
