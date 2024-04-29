package com.ssafy.Algowithme.page.dto.response;

import com.ssafy.Algowithme.page.dto.TestCase;
import com.ssafy.Algowithme.page.entity.BOJ;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProblemResponse {

    private String id;
    private int number;
    private String level;
    private int limit_time;
    private List<TestCase> test_case;

    public ProblemResponse(BOJ boj) {
        this.id = boj.getId();
        this.number = boj.getNumber();
        this.level = boj.getLevel();
        this.limit_time = boj.getLimit_time();
        this.test_case = boj.getTest_case();
    }
}
