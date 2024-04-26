package com.ssafy.Algowithme.common.service;

import com.ssafy.Algowithme.common.dto.request.PostExecutionRequest;
import com.ssafy.Algowithme.common.dto.request.ExecuteRequest;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {

    private final WebClient webClient;

    public ExecutionResponse executeCode(ExecuteRequest request){
        return webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/execute")
                        .path(request.getLanguage().getPath())
                        .build()
                )
                .bodyValue(new PostExecutionRequest(request.getCode(), request.getInput()))
                .retrieve()
                .bodyToMono(ExecutionResponse.class)
                .block();
    }
}
