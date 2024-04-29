package com.ssafy.Algowithme.problem.entity;

import com.ssafy.Algowithme.problem.dto.EditCode;
import com.ssafy.Algowithme.problem.dto.TestCase;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Document(collection = "problem")
public class RawProblem {
    private String site;
    private String url;
    private int number;
    private String title;
    private String content;
    private String level;
    private List<Integer> timeLimit;
    private List<TestCase> exampleList;
    private List<EditCode> editCodeList;
}
