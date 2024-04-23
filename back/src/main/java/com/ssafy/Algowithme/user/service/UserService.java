package com.ssafy.Algowithme.user.service;

import com.ssafy.Algowithme.user.dto.response.GithubInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.repository.UserRepository;
import com.ssafy.Algowithme.user.util.GithubOAuth2Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final GithubOAuth2Utils githubUtil;

    public User getUserInfo(String code) {
        GithubInfoResponse githubInfoResponse = githubUtil.getGithubInfo(code);

        return userRepository.findByCode(code)
                .orElseGet(() -> userRepository.save(User.builder()
                        .code(code)
                        .nickname(githubInfoResponse.getLogin())
                        .imageUrl(githubInfoResponse.getImageUrl())
                        .build()));
    }
}
