package com.ssafy.Algowithme.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecentTeamDto {

  private Long id;
  private String name;
  private String imageUrl;
  private LocalDateTime visitedAt;
}
