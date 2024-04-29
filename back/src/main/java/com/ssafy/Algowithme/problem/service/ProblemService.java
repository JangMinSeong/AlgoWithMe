package com.ssafy.Algowithme.problem.service;

import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.problem.repository.BOJRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final BOJRepository bojRepository;

    public ProblemResponse getProblem(String provider, String problemId) throws BadRequestException {
        if (provider.equals("BOJ")) {
            return new ProblemResponse(bojRepository.findById(problemId).orElseThrow(() -> new BadRequestException("없는 문제입니다.")));
        }

        throw new BadRequestException("잘못된 문제 사이트입니다.");
    }
}
