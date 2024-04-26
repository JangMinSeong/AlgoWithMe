package com.ssafy.Algowithme.common.entity;

import com.ssafy.Algowithme.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class UserProblem extends BaseTimeEntity { // 유저가 푼 문제
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_problem_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;
}
