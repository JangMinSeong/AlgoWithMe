package com.ssafy.Algowithme.common.controller;


import com.ssafy.Algowithme.common.dto.request.ExecuteRequest;
import com.ssafy.Algowithme.common.dto.request.MarkRequest;
import com.ssafy.Algowithme.common.dto.request.SaveCodeRequest;
import com.ssafy.Algowithme.common.dto.response.BOJResponse;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.common.dto.response.SWEAResponse;
import com.ssafy.Algowithme.common.service.CodeService;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/save")
    public ResponseEntity<String> savePersonalCode(@RequestBody SaveCodeRequest request, @AuthenticationPrincipal User user) {
        codeService.savePersonalCode(request, user);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/execute")
    public Mono<ResponseEntity<ExecutionResponse>> execute(@RequestBody ExecuteRequest request) {
        return codeService.executeCode(request)
                .map(response -> ResponseEntity.ok().body(response));
    }

    @PostMapping("/boj")
    public Mono<ResponseEntity<BOJResponse>> markBOJ(@RequestBody MarkRequest request) {
        return codeService.markBOJ(request)
                .map(response -> ResponseEntity.ok().body(response));
    }

    @PostMapping("/swea")
    public Mono<ResponseEntity<SWEAResponse>> markSwea(@RequestBody MarkRequest request) {
        return codeService.markSWEA(request)
                .map(response -> ResponseEntity.ok().body(response));
    }
}

