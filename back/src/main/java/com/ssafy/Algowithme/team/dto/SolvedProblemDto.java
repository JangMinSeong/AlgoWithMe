package com.ssafy.Algowithme.team.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SolvedProblemDto {

  private long pageId;
  private long problemId;
  private String url;
  private String provider;
  private int number;
  private String name;
  private String level;
  private LocalDateTime createdAt;
}
