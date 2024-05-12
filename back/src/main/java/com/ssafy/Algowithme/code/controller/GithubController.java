package com.ssafy.Algowithme.code.controller;

import com.ssafy.Algowithme.code.dto.request.CodeUploadRequest;
import com.ssafy.Algowithme.code.dto.response.RepositoryResponse;
import com.ssafy.Algowithme.code.service.GithubService;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/github")
@RequiredArgsConstructor
public class GithubController {

    private final GithubService githubService;

    @GetMapping("/repository")
    public ResponseEntity<List<RepositoryResponse>> getRepositories(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getRepositories(user));
    }

    @GetMapping("/repository/{repo}")
    public ResponseEntity<List<String>> getBranches(@PathVariable("repo") String repo, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getBranches(repo, user));
    }

    @GetMapping("/repository/{repo}/{branch}")
    public ResponseEntity<List<String>> getDirectoryContent(@PathVariable("repo") String repo, @PathVariable("branch") String branch, @RequestParam("path") String path, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getDirectoryStructure(repo, branch, path, user));
    }

    @PostMapping("/repository/{repo}/{branch}")
    public ResponseEntity<String> uploadCode(@PathVariable("repo") String repo, @PathVariable("branch") String branch, @RequestBody CodeUploadRequest req, @AuthenticationPrincipal User user) {
        githubService.uploadFile(repo, branch, req, user);
        return ResponseEntity.ok("Success");
    }
}
