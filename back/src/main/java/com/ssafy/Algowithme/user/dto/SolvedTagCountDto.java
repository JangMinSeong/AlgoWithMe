package com.ssafy.Algowithme.user.dto;

import com.ssafy.Algowithme.problem.type.Tag;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedTagCountDto {

    private Tag tag;
    private Long count;
}
