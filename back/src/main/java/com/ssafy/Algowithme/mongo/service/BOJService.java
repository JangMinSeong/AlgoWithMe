package com.ssafy.Algowithme.mongo.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.mongo.model.BOJ;
import com.ssafy.Algowithme.mongo.repository.BOJRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BOJService {

    private final BOJRepository bojRepository;

    public BOJ getBOJByNumber(int number) {
        return bojRepository.findByNumber(number)
                .orElseThrow(()-> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));
    }

}
