package com.ssafy.Algowithme.page.controller;

import com.ssafy.Algowithme.page.dto.request.CreateDocsRequest;
import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.page.service.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/page")
@RequiredArgsConstructor
public class PageController {

    private final PageService pageService;

    @GetMapping("/problem/{provider}/{problemId}")
    public ProblemResponse getProblem(@PathVariable String provider, @PathVariable Integer problemId) {
        return pageService.getProblemInfo(provider, problemId);
    }

    @PostMapping("/docs")
    public ResponseEntity<Void> createDocs(CreateDocsRequest request) {
        pageService.createDocs(request);
        return ResponseEntity.ok().build();
    }

}
