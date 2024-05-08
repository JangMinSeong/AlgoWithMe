package com.ssafy.Algowithme.page.dto;

import com.ssafy.Algowithme.page.entity.Page;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageInfo {
    private Long pageId;
    private String title;
    private boolean isDocs;
    private List<PageInfo> children;

    public static PageInfo create(Page page) {
        boolean isDocs = true;
        if(page.getProblem() == null) {
            isDocs = false;
        }
        return PageInfo.builder()
                .pageId(page.getId())
                .title(page.getTitle())
                .isDocs(isDocs)
                .children(new ArrayList<>())
                .build();
    }
}
