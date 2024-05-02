package com.ssafy.Algowithme.team.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTeamRequest {

    private Integer userId;

    private String name;

    private String description;

    private String imageUrl;
}
