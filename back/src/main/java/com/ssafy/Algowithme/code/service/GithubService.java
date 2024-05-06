package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.response.RepositoryResponse;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GithubService {

    public List<RepositoryResponse> getListRepositoriesForUser(User user) {
        GitHub gitHub = getGitHub(user.getGitToken());
        try {
            Map<String, GHRepository> repositories = gitHub.getMyself().getRepositories();
            return repositories.keySet().stream()
                    .map(repositories::get)
                    .map(RepositoryResponse::create)
                    .toList();
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
    }

    public RepositoryResponse getRepositoryForUser(String name, User user) {
        GitHub gitHub = getGitHub(user.getGitToken());
        try {
            return RepositoryResponse.create(gitHub.getMyself().getRepository(name));
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
    }

    public GitHub getGitHub(String token) {
        try {
            GitHub gitHub = new GitHubBuilder().withOAuthToken(token).build();
            gitHub.checkApiUrlValidity();
            return gitHub;
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_TOKEN_BAD_CREDENTIALS);
        }
    }

}
