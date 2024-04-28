package com.ssafy.Algowithme.common.service;

import com.ssafy.Algowithme.common.dto.request.PostExecutionRequest;
import com.ssafy.Algowithme.common.dto.request.ExecuteRequest;
import com.ssafy.Algowithme.common.dto.request.SaveCodeRequest;
import com.ssafy.Algowithme.common.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.common.entity.PersonalCode;
import com.ssafy.Algowithme.common.entity.page.Page;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.common.repository.PageRepository;
import com.ssafy.Algowithme.common.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;


@Slf4j
@Service
@RequiredArgsConstructor
public class CodeService {

    private final PersonalCodeRepository personalCodeRepository;
    private final PageRepository pageRepository;
    private final WebClient webClient;

    @Transactional
    public void savePersonalCode(SaveCodeRequest request) {
        PersonalCode code = personalCodeRepository.findById(request.getCodeId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND));
        code.setCode(request.getCode());
        code.setLanguage(request.getLanguage());
    }

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
