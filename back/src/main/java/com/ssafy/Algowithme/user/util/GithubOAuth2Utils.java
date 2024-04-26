package com.ssafy.Algowithme.user.util;

import com.ssafy.Algowithme.user.dto.request.GithubTokenRequest;
import com.ssafy.Algowithme.user.dto.response.GithubInfoResponse;
import com.ssafy.Algowithme.user.dto.response.GithubTokenResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class GithubOAuth2Utils {

    @Value("${github.client.id}")
    private String clientId;

    @Value("${github.client.secrets}")
    private String clientSecret;

    @Value("${github.info.url}")
    private String githubInfoUrl;

    @Value("${github.token.url}")
    private String githubTokenUrl;

    public GithubInfoResponse getGithubInfo(String token) {
        HttpHeaders headers = new HttpHeaders();

        headers.setBearerAuth(token);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        try {
            return restTemplate.exchange(
                    githubInfoUrl,
                    HttpMethod.GET,
                    request,
                    GithubInfoResponse.class
            ).getBody();
        } catch (HttpClientErrorException e) {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "해당하는 유저가 없습니다.");
        }
    }

    public String getGithubToken(String code) throws RuntimeException {
        RestTemplate restTemplate = new RestTemplate();

        GithubTokenResponse githubTokenResponse = restTemplate.postForObject(
                githubTokenUrl,
                new GithubTokenRequest(clientId, clientSecret, code),
                GithubTokenResponse.class
        );

        log.info("Github Code : " + code);
        log.info("Github Secret : " + clientSecret);
        log.info("Github Token Url : " + githubTokenUrl);
        log.info("GithubTokenResponse : " + githubTokenResponse);

        if (githubTokenResponse != null && githubTokenResponse.getAccessToken() != null) {
            return githubTokenResponse.getAccessToken();
        }

        throw new RuntimeException("Github Access Token 이 없습니다.");
    }
}
