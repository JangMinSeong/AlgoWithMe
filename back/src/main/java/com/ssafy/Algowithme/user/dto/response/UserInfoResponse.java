package com.ssafy.Algowithme.user.dto.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

    private Integer id;
    private String nickname;
    private String imageUrl;
}
