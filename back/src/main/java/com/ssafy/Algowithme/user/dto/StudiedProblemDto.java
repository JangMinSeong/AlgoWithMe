package com.ssafy.Algowithme.user.dto;

import com.ssafy.Algowithme.problem.type.Provider;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudiedProblemDto {

    private Provider provider;
    private int number;
    private String name;
    private String url;
}
