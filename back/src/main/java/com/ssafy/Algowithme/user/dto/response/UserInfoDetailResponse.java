package com.ssafy.Algowithme.user.dto.response;

import com.ssafy.Algowithme.user.dto.RecentTeamDto;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;
import com.ssafy.Algowithme.user.dto.StudiedProblemDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDetailResponse {

  private Integer id;
  private List<SolvedTagCountDto> chart;
  private List<StudiedProblemDto> problems;
  private List<RecentTeamDto> teams;
}
