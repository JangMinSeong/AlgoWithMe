package com.ssafy.Algowithme.problem.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Tag {
    DFS("DFS"), BFS("BFS"), BRUTEFORCE("브루트포스"),
    GREEDY("그리디"), SHORTEST_PATH("최단경로"), ;
    final private String name;
}
