package com.ssafy.Algowithme.common.dto.request;

import com.ssafy.Algowithme.mongo.model.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostBOJRequest {
    private String code;
    private int limit_time;
    private List<TestCase> test_cases;
}
