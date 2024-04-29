package com.ssafy.Algowithme.common.service;

import com.ssafy.Algowithme.common.dto.request.*;
import com.ssafy.Algowithme.common.dto.response.BOJResponse;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.common.entity.PersonalCode;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.common.repository.PageRepository;
import com.ssafy.Algowithme.common.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.mongo.model.BOJ;
import com.ssafy.Algowithme.mongo.service.BOJService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {

    private final PersonalCodeRepository personalCodeRepository;
    private final PageRepository pageRepository;
    private final BOJService bojService;
    private final WebClient webClient;

    @Transactional
    public void savePersonalCode(SaveCodeRequest request) {
        PersonalCode code = personalCodeRepository.findById(request.getCodeId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND));
        code.setCode(request.getCode());
        code.setLanguage(request.getLanguage());
    }

    public Mono<ExecutionResponse> executeCode(ExecuteRequest request){
        return webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/execute")
                        .path(request.getLanguage().getPath())
                        .build()
                )
                .bodyValue(new PostExecutionRequest(request.getCode(), request.getInput()))
                .retrieve()
                .bodyToMono(ExecutionResponse.class);
    }

    public Mono<List<BOJResponse>> markBOJ(MarkRequest request) {
        BOJ problem = bojService.getBOJByNumber(request.getNumber());
        return webClient
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/boj")
                        .path(request.getLanguage().getPath())
                        .build()
                )
                .bodyValue(new PostBOJRequest(request.getCode(), problem.getLimit_time(), problem.getTest_case()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<BOJResponse>>() {});
    }
}
