
package com.ssafy.Algowithme.common.service;

import com.ssafy.Algowithme.common.dto.request.*;
import com.ssafy.Algowithme.common.dto.response.BOJResponse;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.common.dto.response.SWEAResponse;
import com.ssafy.Algowithme.common.entity.PersonalCode;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.common.repository.PageRepository;
import com.ssafy.Algowithme.common.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.page.repository.BOJReactiveRepository;
import com.ssafy.Algowithme.page.repository.SWEAReactiveRepository;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
@RequiredArgsConstructor
public class CodeService {

    private final PersonalCodeRepository personalCodeRepository;
    private final PageRepository pageRepository;
    private final BOJReactiveRepository bojReactiveRepository;
    private final SWEAReactiveRepository sweaReactiveRepository;
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
        return bojReactiveRepository.findByNumber(request.getNumber())
                .switchIfEmpty(Mono.error(new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND)))
                .flatMap(problem -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path("/boj")
                                .path(request.getLanguage().getPath())
                                .build()
                        )
                        .bodyValue(new PostBOJRequest(request.getCode(), problem.getLimit_time(), problem.getTest_case()))
                        .retrieve()
                        .bodyToMono(BOJResponse.class));
    }

    public Mono<SWEAResponse> markSWEA(MarkRequest request) {
        return sweaReactiveRepository.findByNumber(request.getNumber())
                .switchIfEmpty(Mono.error(new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND)))
                .flatMap(problem -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path("/swea")
                                .path(request.getLanguage().getPath())
                                .build()
                        )
                        .bodyValue(new PostSWEARequest(request.getCode(), problem.getLimit_time().get(request.getLanguage().ordinal()), problem.getInput(), problem.getOutput()))
                        .retrieve()
                        .bodyToMono(SWEAResponse.class));
    }
}
