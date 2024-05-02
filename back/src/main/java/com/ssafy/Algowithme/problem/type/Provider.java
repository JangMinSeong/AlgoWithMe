package com.ssafy.Algowithme.problem.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Provider {
    BOJ("baekjoon"), SWEA("swea"), PROGRAMMERS("programmers");
    private final String name;
}
