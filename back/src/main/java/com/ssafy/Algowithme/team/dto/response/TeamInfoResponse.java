package com.ssafy.Algowithme.team.dto.response;

import com.ssafy.Algowithme.team.dto.request.CreateTeamRequest;
import com.ssafy.Algowithme.team.entity.Team;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TeamInfoResponse {

    private Long teamId;

    public static TeamInfoResponse create(Long teamId) {
        return TeamInfoResponse.builder()
                .teamId(teamId)
                .build();
    }
}
