package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.request.*;
import com.ssafy.Algowithme.code.dto.response.BOJResponse;
import com.ssafy.Algowithme.code.dto.response.ExecutionResponse;
import com.ssafy.Algowithme.code.dto.response.ProgrammersResponse;
import com.ssafy.Algowithme.code.dto.response.SWEAResponse;
import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.code.type.Language;
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
                        .bodyValue(new PostBOJRequest(request.getCode(), Integer.parseInt(problem.getTimeLimit().getFirst().split(" ")[0]), problem.getExampleList()))
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
                        .bodyValue(new PostSWEARequest(request.getCode(), Integer.parseInt(problem.getTimeLimit().get(request.getLanguage().ordinal())), problem.getExampleList().getFirst().getProblem(), problem.getExampleList().getFirst().getAnswer()))
                        .retrieve()
                        .bodyToMono(SWEAResponse.class));
    }

    public Mono<ProgrammersResponse> markProgrammers(MarkRequest request) {
        return reactiveRawProblemRepository.findRawProblemBySiteAndNumber(Provider.PROGRAMMERS.getName(), request.getNumber())
                .switchIfEmpty(Mono.error(new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND)))
                .flatMap(problem -> webClient.post()
                        .uri(uriBuilder -> uriBuilder
                                .path("/programmers")
                                .path(request.getLanguage().getPath())
                                .build()
                        )
                        .bodyValue(new PostProgrammersRequest(getProgrammersMain(request.getLanguage()), request.getCode(), problem.getExampleList()))
                        .retrieve()
                        .bodyToMono(ProgrammersResponse.class));
    }

    public String getProgrammersMain(Language language) {
        return switch (language) {
            case C -> "TODO!";
            case CPP -> "TODO@";
            case JAVA -> "\nimport java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.lang.reflect.Method;\nimport java.lang.reflect.Parameter;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            Class<?> cls = Class.forName(\"Solution\");\n            Method method = cls.getDeclaredMethods()[0];\n            Parameter[] parameters = method.getParameters();\n\n            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n            Object[] inputs = new Object[parameters.length];\n            int index = 0;\n\n            for (Parameter param : parameters) {\n                Class<?> type = param.getType();\n                String input = br.readLine();\n\n                if (type == int.class) {\n                    inputs[index] = Integer.parseInt(input);\n                } else if (type == double.class) {\n                    inputs[index] = Double.parseDouble(input);\n                } else if (type == String.class) {\n                    inputs[index] = input;\n                } else if (type == int[][].class) {\n\n                } else {\n                    System.out.println(\"Unsupported type\");\n                    continue;\n                }\n                index++;\n            }\n            br.close();\n\n            Object instance = cls.getDeclaredConstructor().newInstance();\n            Object result = method.invoke(instance, inputs);\n\n            System.out.println(result);\n        } catch (Exception e) {\n            e.printStackTrace();\n            System.out.println(\"error \ubc1c\uc0dd\");\n        }\n    }\n}\n";
            case PYTHON -> "TODO*";
        };
    }
}