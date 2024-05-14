package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.request.CodeUploadRequest;
import com.ssafy.Algowithme.code.dto.response.RepositoryResponse;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.kohsuke.github.GHBranch;
import org.kohsuke.github.GHContent;
import org.kohsuke.github.GHContentBuilder;
import org.kohsuke.github.GHContentUpdateResponse;
import org.kohsuke.github.GHFileNotFoundException;
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

    public List<RepositoryResponse> getRepositories(User user) {
        GitHub gitHub = getGitHub(user);
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

    public List<String> getBranches(String repo, User user) {
        GitHub gitHub = getGitHub(user);
        try {
            GHRepository repository = gitHub.getMyself().getRepository(repo);
            if(repository == null) throw new CustomException(ExceptionStatus.GITHUB_REPOSITORY_NOT_FOUND);
            return repository.getBranches().values().stream().map(GHBranch::getName).toList();
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
    }

    public List<String> getDirectoryStructure(String repo, String branch, String path, User user) {
        GitHub gitHub = getGitHub(user);
        try {
            GHRepository repository = gitHub.getMyself().getRepository(repo);
            List<GHContent> contents = repository.getDirectoryContent(path, branch);
            return contents.stream().filter(GHContent::isDirectory).map(GHContent::getName).toList();
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
    }

    public void uploadFile(CodeUploadRequest req, User user) {
        GitHub gitHub = getGitHub(user);
        try {
            GHRepository repository = gitHub.getMyself().getRepository(req.getRepo());
            String path = req.getPath() + req.getFileName() + req.getLanguage().getExtension();
            try {
                GHContent fileContent = repository.getFileContent(path, req.getBranch());
                GHContentUpdateResponse response = fileContent.update(req.getContent(), req.getCommitMessage(), req.getBranch());
            } catch (GHFileNotFoundException e) {
                GHContentBuilder contentBuilder = repository.createContent();
                contentBuilder.path(path).branch(req.getBranch()).content(req.getContent()).message(req.getCommitMessage()).commit();
            }
        }
        catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
    }

    public GitHub getGitHub(User user) {
        if(user == null) throw new CustomException(ExceptionStatus.GITHUB_USER_NOT_FOUND);
        try {
            GitHub gitHub = new GitHubBuilder().withOAuthToken(user.getGitToken()).build();
            gitHub.checkApiUrlValidity();
            return gitHub;
        } catch (IOException e) {
            throw new CustomException(ExceptionStatus.GITHUB_TOKEN_BAD_CREDENTIALS);
        }
    }

}
