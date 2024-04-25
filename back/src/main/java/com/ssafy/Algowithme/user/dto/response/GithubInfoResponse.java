package com.ssafy.Algowithme.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GithubInfoResponse {
    private String login;
    private String name;
    private String email;
    @JsonProperty("id")
    private int gitId;
    @JsonProperty("avatar_url")
    private String imageUrl;
    @JsonProperty("html_url")
    private String githubUrl;
}
