package com.ssafy.Algowithme.user.entity;

import com.ssafy.Algowithme.common.util.BaseTime;
import com.ssafy.Algowithme.team.entity.Team;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class UserTeam extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_team_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="team_id")
    private Team team;

    @Column(nullable = false)
    private boolean manager;

    @Column(nullable = false)
    private LocalDateTime visitedAt;
}
