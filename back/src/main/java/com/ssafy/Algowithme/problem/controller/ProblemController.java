package com.ssafy.Algowithme.problem.controller;

import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.problem.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/problem")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @GetMapping("/{provider}/{problemId}")
    public ProblemResponse getProblem(@PathVariable String provider, @PathVariable String problemId) throws BadRequestException {
        return problemService.getProblem(provider, problemId);
    }
}
