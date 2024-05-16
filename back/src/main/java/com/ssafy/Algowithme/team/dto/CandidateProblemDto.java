package com.ssafy.Algowithme.team.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CandidateProblemDto {

  private Long candidateId;
  private Long problemId;
  private String url;
  private String provider;
  private int number;
  private String name;
  private String level;
}
