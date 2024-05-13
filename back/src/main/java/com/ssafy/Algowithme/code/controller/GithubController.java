package com.ssafy.Algowithme.code.controller;

import com.ssafy.Algowithme.code.dto.request.CodeUploadRequest;
import com.ssafy.Algowithme.code.dto.request.ListBranchRequest;
import com.ssafy.Algowithme.code.dto.request.ListDirectoryRequest;
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

    @PostMapping("/branch")
    public ResponseEntity<List<String>> getBranches(@RequestBody ListBranchRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getBranches(req.getRepo(), user));
    }

    @PostMapping("/directory")
    public ResponseEntity<List<String>> getDirectoryContent(@RequestBody ListDirectoryRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(githubService.getDirectoryStructure(req.getRepo(), req.getBranch(), req.getPath(), user));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCode(@RequestBody CodeUploadRequest req, @AuthenticationPrincipal User user) {
        githubService.uploadFile(req, user);
        return ResponseEntity.ok("Success");
    }
}
