package com.ssafy.Algowithme.user.entity;

import com.ssafy.Algowithme.common.util.BaseTime;
import com.ssafy.Algowithme.problem.entity.Problem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class UserProblem extends BaseTime { // 유저가 푼 문제
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
