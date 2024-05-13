package com.ssafy.Algowithme.problem.dto.response;

import com.ssafy.Algowithme.page.entity.WorkspaceTag;
import com.ssafy.Algowithme.problem.dto.EditCode;
import com.ssafy.Algowithme.problem.dto.TestCase;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.type.Tag;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RawProblemResponse {
    private String id;
    private String site;
    private String url;
    private int number;
    private String title;
    private String content;
    private String level;
    private List<Integer> timeLimit;
    private List<TestCase> exampleList;
    private List<EditCode> editCodesList;
    private List<Tag> tagList;

    public static RawProblemResponse create(RawProblem rawProblem, List<WorkspaceTag> workspaceTags) {
        List<Tag> tagList = new ArrayList<>();
        for(WorkspaceTag workspaceTag : workspaceTags) {
            tagList.add(workspaceTag.getTag());
        }
        return RawProblemResponse.builder()
                .id(rawProblem.getId())
                .site(rawProblem.getSite())
                .url(rawProblem.getUrl())
                .number(rawProblem.getNumber())
                .title(rawProblem.getTitle())
                .content(rawProblem.getContent())
                .level(rawProblem.getLevel())
                .timeLimit(rawProblem.getTimeLimit())
                .exampleList(rawProblem.getExampleList())
                .editCodesList(rawProblem.getEditCodesList())
                .tagList(tagList)
                .build();
    }
}
