package com.ssafy.Algowithme.page.controller;

import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.page.dto.request.CreateDocsRequest;
import com.ssafy.Algowithme.page.dto.response.CreateDocsResponse;
import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.page.service.PageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "페이지 생성", description = "팀 아이디와 상위 페이지 아이디를 입력하여, 페이지를 생성한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "페이지 생성 성공", content = {@Content(schema = @Schema(implementation = CreateDocsResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1200", description = "상위 페이지가 존재하지 않습니다.", content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<CreateDocsResponse> createDocs(@RequestBody CreateDocsRequest request) {
        CreateDocsResponse response = pageService.createDocs(request);
        return ResponseEntity.ok(response);
    }

}
