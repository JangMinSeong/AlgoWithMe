package com.ssafy.Algowithme.code.util;

import com.ssafy.Algowithme.problem.entity.BOJ;
import com.ssafy.Algowithme.problem.repository.BOJRepository;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BOJUtil {

    private final BOJRepository bojRepository;

    public BOJ getBOJByNumber(int number) {
        return bojRepository.findByNumber(number)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
    }
}
