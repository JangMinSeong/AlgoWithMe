package com.ssafy.Algowithme.page.service;

import com.ssafy.Algowithme.page.dto.response.ProblemResponse;
import com.ssafy.Algowithme.page.util.BOJUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PageService {

    private final BOJUtil bojUtil;

    public ProblemResponse getProblemInfo(String provider, Integer problemId) {

        if(provider.equals("boj")) {
            return new ProblemResponse(bojUtil.getBOJByNumber(problemId));
        } else {
            return null;
        }
    }
}
