package com.ssafy.Algowithme.code.controller;

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
    public ResponseEntity<List<String>> getBranches(@PathVariable String repo, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getBranches(repo, user));
    }

    @GetMapping("/repository/{repo}/{branch}")
    public ResponseEntity<List<String>> getDirectoryContent(@PathVariable String repo, @PathVariable String branch, @RequestParam String path, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getDirectoryStructure(repo, branch, path, user));
    }


}
