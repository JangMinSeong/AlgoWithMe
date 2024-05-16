package com.ssafy.Algowithme.team.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RankDto {

  private Integer id;
  private String nickname;
  private String imageUrl;
  private Long solvedCount;
}
