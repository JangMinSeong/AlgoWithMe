package com.ssafy.Algowithme.team.entity;

import com.ssafy.Algowithme.common.util.BaseTime;
import com.ssafy.Algowithme.user.entity.UserTeam;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Team extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    private String name;

    private String description;

    private boolean canRead;

    private String imageUrl;

    private boolean deleted;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private List<UserTeam> userTeamList;

}
