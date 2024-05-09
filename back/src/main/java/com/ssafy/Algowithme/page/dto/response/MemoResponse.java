package com.ssafy.Algowithme.page.dto.response;

import com.ssafy.Algowithme.page.entity.UserWorkspace;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemoResponse {
    private Long memoId;
    private String memo;

    public static MemoResponse create(UserWorkspace userWorkspace) {
        return MemoResponse.builder()
                .memoId(userWorkspace.getId())
                .memo(userWorkspace.getContent())
                .build();
    }
}
