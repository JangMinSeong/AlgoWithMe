package com.ssafy.Algowithme.page.controller;

import com.ssafy.Algowithme.page.dto.response.ProblemResponse;
import com.ssafy.Algowithme.page.service.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController("/page")
@RequiredArgsConstructor
public class PageController {

    private final PageService pageService;

    @GetMapping("/problem/{provider}/{problemId}")
    public ProblemResponse getProblem(@PathVariable String provider, @PathVariable Integer problemId) {
        return pageService.getProblemInfo(provider, problemId);
    }
}
