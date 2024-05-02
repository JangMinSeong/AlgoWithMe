package com.ssafy.Algowithme.team.dto.response;

import com.ssafy.Algowithme.team.dto.request.CreateTeamRequest;
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

    public static TeamInfoResponse create(Long teamId, CreateTeamRequest request) {
        return TeamInfoResponse.builder()
                .teamId(teamId)
                .name(request.getName())
                .description(request.getDescription())
                .canRead(false)
                .imageUrl(request.getImageUrl())
                .build();
    }
}
