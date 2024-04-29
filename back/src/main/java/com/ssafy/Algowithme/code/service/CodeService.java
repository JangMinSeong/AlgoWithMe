package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.request.*;
import com.ssafy.Algowithme.code.dto.response.BOJResponse;
import com.ssafy.Algowithme.code.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.code.util.BOJUtil;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.code.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.problem.entity.BOJ;
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
    private final BOJUtil bojUtil;
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
        BOJ problem = bojUtil.getBOJByNumber(request.getNumber());
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