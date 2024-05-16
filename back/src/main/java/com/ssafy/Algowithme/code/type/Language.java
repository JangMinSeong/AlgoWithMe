package com.ssafy.Algowithme.code.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Language {
  C("C", "/c", ".c"), CPP("C++", "/cpp", ".cpp"),
  JAVA("JAVA", "/java", ".java"), PYTHON("Python", "/python", ".py");
  private final String name;
  private final String path;
  private final String extension;
}
