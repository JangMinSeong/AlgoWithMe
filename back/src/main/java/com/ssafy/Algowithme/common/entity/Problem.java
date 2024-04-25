package com.ssafy.Algowithme.common.entity;

import com.ssafy.Algowithme.common.entity.enums.Provider;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problem_id")
    private Long id;

    private String url;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    private int number; // 문제 번호

    private String name; // 문제 이름

    private String level;
}
