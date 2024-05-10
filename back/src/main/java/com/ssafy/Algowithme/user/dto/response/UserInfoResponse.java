package com.ssafy.Algowithme.user.dto.response;

import com.ssafy.Algowithme.user.entity.User;
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

    static public UserInfoResponse fromEntity (User entity) {
        return new UserInfoResponse(entity.getId(), entity.getNickname(), entity.getImageUrl());
    }
}
