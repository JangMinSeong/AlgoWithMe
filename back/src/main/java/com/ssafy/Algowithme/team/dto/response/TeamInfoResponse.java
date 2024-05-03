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

    private String name;

    private String description;

    private boolean canRead;

    private String imageUrl;

    public static TeamInfoResponse create(Team team) {
        return TeamInfoResponse.builder()
                .teamId(team.getId())
                .name(team.getName())
                .canRead(false)
                .imageUrl(team.getImageUrl())
                .build();
    }
}
