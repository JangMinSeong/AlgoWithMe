package com.ssafy.Algowithme.common.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Language {
    C("C", "/c"), CPP("C++", "/cpp"), JAVA("JAVA", "/java"), PYTHON("Python", "/python");
    private final String name;
    private final String path;
}
