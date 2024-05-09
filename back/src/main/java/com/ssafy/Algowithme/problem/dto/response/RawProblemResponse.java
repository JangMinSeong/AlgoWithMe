package com.ssafy.Algowithme.problem.dto.response;

import com.ssafy.Algowithme.problem.dto.EditCode;
import com.ssafy.Algowithme.problem.dto.TestCase;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RawProblemResponse {

    private String site;
    private String url;
    private int number;
    private String title;
    private String content;
    private String level;
    private List<Integer> timeLimit;
    private List<TestCase> exampleList;
    private List<EditCode> editCodesList;

    public static RawProblemResponse create(RawProblem rawProblem) {
        return RawProblemResponse.builder()
                .site(rawProblem.getSite())
                .url(rawProblem.getUrl())
                .number(rawProblem.getNumber())
                .title(rawProblem.getTitle())
                .content(rawProblem.getContent())
                .level(rawProblem.getLevel())
                .timeLimit(rawProblem.getTimeLimit())
                .exampleList(rawProblem.getExampleList())
                .editCodesList(rawProblem.getEditCodesList())
                .build();
    }
}
