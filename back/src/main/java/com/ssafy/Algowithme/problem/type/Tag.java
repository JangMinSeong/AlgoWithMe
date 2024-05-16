package com.ssafy.Algowithme.problem.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Tag {
  DFS("DFS"), BFS("BFS"), BRUTEFORCE("브루트포스"),
  GREEDY("그리디"), DP("다이나믹 프로그래밍"),
  STRING("문자열"), BINARY_SEARCH("이분 탐색"), SIMULATION("구현"),
  SORTING("정렬"), BITMASK("비트 마스킹"), BACKTRACKING("백트래킹"),
  DATA_STRUCTURES("자료구조"), GRAPH("그래프"),
  ;
  final private String name;

  public static Tag fromString(String text) {
    for (Tag tag : Tag.values()) {
      if (tag.getName().equalsIgnoreCase(text)) {
        return tag;
      }
    }
    return null;
  }
}
