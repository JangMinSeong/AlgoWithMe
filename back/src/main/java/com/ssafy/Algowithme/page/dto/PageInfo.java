package com.ssafy.Algowithme.page.dto;

import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.problem.type.Provider;
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
    private String provider;
    private List<PageInfo> children;

    public static PageInfo create(Page page) {
        boolean isDocs = false;
        if(page.getProblem() == null) {
            isDocs = true;
        }

        String provider = "";
        if(isDocs == false) {
            provider = page.getProblem().getProvider().getName();
        }

        return PageInfo.builder()
                .pageId(page.getId())
                .title(page.getTitle())
                .isDocs(isDocs)
                .provider(provider)
                .children(new ArrayList<>())
                .build();
    }
}
