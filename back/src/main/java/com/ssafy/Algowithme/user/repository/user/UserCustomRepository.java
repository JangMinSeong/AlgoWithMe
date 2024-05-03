package com.ssafy.Algowithme.user.repository.user;

import com.ssafy.Algowithme.user.dto.RecentTeamDto;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;
import com.ssafy.Algowithme.user.dto.StudiedProblemDto;

import java.util.List;

public interface UserCustomRepository {

    List<SolvedTagCountDto> getSolvedTagChart(Integer userId);

    List<StudiedProblemDto> getStudiedProblem(Integer userId);

    List<RecentTeamDto> getRecentTeam(Integer userId);
}
