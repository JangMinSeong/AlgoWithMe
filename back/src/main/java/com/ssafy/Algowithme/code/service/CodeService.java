package com.ssafy.Algowithme.code.service;

import com.ssafy.Algowithme.code.dto.request.*;
import com.ssafy.Algowithme.code.dto.response.*;
import com.ssafy.Algowithme.code.entity.Code;
import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.code.repository.CodeCacheRepository;
import com.ssafy.Algowithme.code.type.Language;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.code.repository.PersonalCodeRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemReactiveRepository;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final UserRepository userRepository;
    private final RawProblemReactiveRepository reactiveRawProblemRepository;
    private final WebClient webClient;
    private final CodeCacheRepository codeCacheRepository;

    @Transactional
    public Long createPersonalCode(Long pageId, User user) {
        Page workspace = pageRepository.findById(pageId).orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        return personalCodeRepository.save(PersonalCode.builder().user(user).workspace(workspace).language(Language.C).deleted(false).build()).getId();
    }

    @Transactional
    public void deletePersonalCode(Long codeId, User user) {
        PersonalCode code = personalCodeRepository.findById(codeId).orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND));
        if(!user.equals(code.getUser()))
            throw new CustomException(ExceptionStatus.USER_MISMATCH);
        code.setDeleted(true);
    }

    @Transactional
    public void savePersonalCode(SaveCodeRequest request, User user) {
        PersonalCode code = personalCodeRepository.findById(request.getCodeId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND));
        if(!user.equals(code.getUser()))
            throw new CustomException(ExceptionStatus.USER_MISMATCH);
        code.setCode(request.getCode());
        code.setLanguage(request.getLanguage());
    }

    public void savePersonalCodeToCache(SaveCodeRequest request) {
        codeCacheRepository.save(Code.fromDto(request));
    }

    public PersonalCodeResponse getPersonalCode(Long codeId) {
        return codeCacheRepository.findById(codeId).map(PersonalCodeResponse::fromEntity)
                .orElseGet(() -> personalCodeRepository.findById(codeId).map(PersonalCodeResponse::fromEntity)
                        .orElseThrow(() -> new CustomException(ExceptionStatus.PERSONAL_CODE_NOT_FOUND))
        );
    }

    public CodeByPageAndUserResponse getCodeByPage(Long pageId, User user) {
        Page workspace = pageRepository.findById(pageId).orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        List<PersonalCode> codes = personalCodeRepository.findAllByWorkspaceAndUserAndDeletedFalseOrderByIdAsc(workspace, user);
        return new CodeByPageAndUserResponse(codes.stream().map(PersonalCode::getId).toList(), PersonalCodeResponse.fromEntity(codes.getFirst()));
    }


    public CodeByPageAndUserResponse getPersonalCodeByPageAndUser(Long pageId, Integer userId) {
        Page workspace = pageRepository.findById(pageId).orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionStatus.USER_NOT_FOUND));
        List<PersonalCode> codes = personalCodeRepository.findAllByWorkspaceAndUserAndDeletedFalseOrderByIdAsc(workspace, user);
        return new CodeByPageAndUserResponse(codes.stream().map(PersonalCode::getId).toList(), PersonalCodeResponse.fromEntity(codes.getFirst()));
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
        return reactiveRawProblemRepository.findById(request.getUid())
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
        return reactiveRawProblemRepository.findById(request.getUid())
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

    public Mono<ProgrammersResponse> markProgrammers(MarkRequest request) {
        return reactiveRawProblemRepository.findById(request.getUid())
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
            case JAVA -> "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.lang.reflect.Method;\nimport java.lang.reflect.Parameter;\nimport java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            Class<?> cls = Class.forName(\"Solution\");\n            Method method = cls.getDeclaredMethods()[0];\n            Parameter[] parameters = method.getParameters();\n\n            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n            Object[] inputs = new Object[parameters.length];\n            int index = 0;\n\n            for (Parameter param : parameters) {\n                Class<?> type = param.getType();\n                String input = br.readLine();\n\n                if (type == int.class) {\n                    inputs[index] = Integer.parseInt(input);\n                } else if (type == double.class) {\n                    inputs[index] = Double.parseDouble(input);\n                } else if (type == String.class) {\n                    inputs[index] = input;\n                } else if (type == int[].class) {\n                    inputs[index] = parse1DArray(input);\n                } else if (type == int[][].class) {\n                    inputs[index] = parse2DArray(input);\n                } else if (type == String[].class) {\n                    inputs[index] = parse1DStringArray(input);\n                } else if (type == String[][].class) {\n                    inputs[index] = parse2DStringArray(input);\n                }\n                else {\n                    System.out.println(\"Unsupported type\");\n                    continue;\n                }\n                index++;\n            }\n            br.close();\n            Object instance = cls.getDeclaredConstructor().newInstance();\n            Object result = method.invoke(instance, inputs);\n            if(result instanceof int[]) {\n                System.out.println(Arrays.toString((int[]) result));\n            } else if (result instanceof String[]) {\n                System.out.println(Arrays.toString((String[]) result));\n            } else if (result instanceof double[]) {\n                System.out.println(Arrays.toString((double[]) result));\n            } else if (result instanceof int[][]) {\n                System.out.println(Arrays.deepToString((int[][]) result));\n            } else if (result instanceof String[][]) {\n                System.out.println(Arrays.deepToString((String[][]) result));\n            } else {\n                System.out.println(result);\n            }\n        } catch (Exception e) {\n            e.printStackTrace();\n            System.out.println(\"error\");\n        }\n    }\n\n    public static int[][] parse2DArray(String input) {\n        input = input.substring(1, input.length() - 1);\n        input = input.replaceAll(\"\\\\s\", \"\");\n        input = input.substring(1, input.length() - 1);\n        String[] rows = input.split(\"],\\\\[\");\n        int[][] result = new int[rows.length][];\n        for (int i = 0; i < rows.length; i++) {\n            String[] elements = rows[i].split(\",\");\n            result[i] = new int[elements.length];\n            for (int j = 0; j < elements.length; j++) {\n                result[i][j] = Integer.parseInt(elements[j]);\n            }\n        }\n        return result;\n    }\n\n    public static int[] parse1DArray(String input) {\n        input = input.replaceAll(\"[\\\\[\\\\]]\", \"\");\n        input = input.replaceAll(\"\\\\s\", \"\");\n        return Arrays.stream(input.split(\",\"))\n                .mapToInt(Integer::parseInt)\n                .toArray();\n    }\n\n    public static String[] parse1DStringArray(String input) {\n        input = input.replaceAll(\"[\\\\[\\\\]]\", \"\");\n        input = input.replaceAll(\"\\\\s\", \"\");\n        return input.split(\",\");\n    }\n\n    public static String[][] parse2DStringArray(String input) {\n        input = input.substring(1, input.length() - 1);\n        input = input.replaceAll(\"\\\\s\", \"\");\n        input = input.substring(1, input.length() - 1);\n        String[] rows = input.split(\"],\\\\[\");\n        String[][] result = new String[rows.length][];\n        for (int i = 0; i < rows.length; i++) {\n            String[] elements = rows[i].split(\",\");\n            result[i] = new String[elements.length];\n            for (int j = 0; j < elements.length; j++) {\n                result[i][j] = elements[j];\n            }\n        }\n        return result;\n    }\n}";
            case PYTHON -> "from  solution import solution\nimport re\nimport sys\n\ndef parse_1d_array(input_str):\n    input_str = re.sub(r'\\[|\\]', '', input_str)\n    input_str = re.sub(r'\\s', '', input_str)\n    return list(map(int, input_str.split(',')))\n\ndef parse_2d_array(input_str):\n    input_str = input_str[1:-1]\n    input_str = re.sub(r'\\s', '', input_str)\n    input_str = input_str[1:-1]\n    rows = input_str.split('],[')\n    return [list(map(int, row.split(','))) for row in rows]\n\ndef parse_1d_string_array(input_str):\n    input_str = re.sub(r'\\[|\\]', '', input_str)\n    input_str = re.sub(r'\\s', '', input_str)\n    return input_str.split(',')\n\ndef parse_2d_string_array(input_str):\n    input_str = input_str[1:-1]\n    input_str = re.sub(r'\\s', '', input_str)\n    input_str = input_str[1:-1]\n    rows = input_str.split('],[')\n    return [row.split(',') for row in rows]\n\ndef main():\n    try:\n        input_data = sys.stdin.read().splitlines()\n        inputs = []\n        for item in input_data:\n            try:\n                inputs.append(int(item))\n            except ValueError:\n                try:\n                    inputs.append(float(item))\n                except ValueError:\n                    item_cleaned = re.sub(r'\\[|\\]|,|\\s', '', item)\n                    if \"[\" in item and \"]]\" in item:\n                        if (item_cleaned.isdigit()):\n                            inputs.append(parse_2d_array(item))\n                        else:\n                            inputs.append(parse_2d_string_array(item))\n                    elif \"[\" in item:\n                        if (item_cleaned.isdigit()):\n                            inputs.append(parse_1d_array(item))\n                        else:\n                            inputs.append(parse_1d_string_array(item))\n                    else:\n                        inputs.append(item)\n        result = solution(*inputs)\n        print(result)\n    except Exception as e:\n        print(\"An error occurred:\", e)\n\nif __name__ == \"__main__\":\n    main()";
        };
    }
}