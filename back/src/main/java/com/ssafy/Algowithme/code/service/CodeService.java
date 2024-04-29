package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.request.*;
import com.ssafy.Algowithme.code.dto.response.BOJResponse;
import com.ssafy.Algowithme.code.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.code.dto.response.SWEAResponse;
import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.code.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemReactiveRepository;
import com.ssafy.Algowithme.problem.type.Provider;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {

    private final PersonalCodeRepository personalCodeRepository;
    private final PageRepository pageRepository;
    private final RawProblemReactiveRepository reactiveRawProblemRepository;
    private final WebClient webClient;

    @Transactional
    public void savePersonalCode(SaveCodeRequest request, User user) {
        PersonalCode code = personalCodeRepository.findById(request.getCodeId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND));
        if(!user.equals(code.getUser()))
            throw new CustomException(ExceptionStatus.USER_MISMATCH);
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

    public Mono<BOJResponse> markBOJ(MarkRequest request) {
        return reactiveRawProblemRepository.findRawProblemBySiteAndNumber(Provider.BOJ.getName(), request.getNumber())
                .switchIfEmpty(Mono.error(new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND)))
                .flatMap(problem -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path("/boj")
                                .path(request.getLanguage().getPath())
                                .build()
                        )
                        .bodyValue(new PostBOJRequest(request.getCode(), problem.getTimeLimit().getFirst(), problem.getExampleList()))
                        .retrieve()
                        .bodyToMono(BOJResponse.class));
    }

    public Mono<SWEAResponse> markSWEA(MarkRequest request) {
        return reactiveRawProblemRepository.findRawProblemBySiteAndNumber(Provider.SWEA.getName(), request.getNumber())
                .switchIfEmpty(Mono.error(new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND)))
                .flatMap(problem -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path("/swea")
                                .path(request.getLanguage().getPath())
                                .build()
                        )
                        .bodyValue(new PostSWEARequest(request.getCode(), problem.getTimeLimit().get(request.getLanguage().ordinal()), problem.getExampleList().getFirst().getProblem(), problem.getExampleList().getFirst().getAnswer()))
                        .retrieve()
                        .bodyToMono(SWEAResponse.class));
    }
}