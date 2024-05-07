package com.ssafy.Algowithme.page.dto.response;

import com.ssafy.Algowithme.page.dto.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageListResponse {
    private List<PageInfo> pageInfoList;
}
