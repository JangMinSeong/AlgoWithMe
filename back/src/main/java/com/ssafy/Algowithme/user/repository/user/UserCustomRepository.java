package com.ssafy.Algowithme.user.repository.user;

import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.user.dto.*;

import java.util.List;

public interface UserCustomRepository {

    List<SolvedTagCountDto> getSolvedTagChart(Integer userId);

    List<StudiedProblemDto> getStudiedProblem(Integer userId);

    List<RecentTeamDto> getRecentTeam(Integer userId);

    List<TeamListDto> getUserTeam(Integer userId);

    List<SearchStudyDto> searchStudyByWord(Integer userId, String word);

    List<Page> searchPageByWord(Integer userId, String word);
}
