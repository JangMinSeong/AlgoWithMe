package com.ssafy.Algowithme.problem.entity;

import com.ssafy.Algowithme.problem.dto.EditCode;
import com.ssafy.Algowithme.problem.dto.TestCase;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "problem")
public class RawProblem {

  @Id
  private String id;
  private String site;
  private String url;
  private int number;
  private String title;
  private String content;
  private String level;
  private List<Integer> timeLimit;
  private List<TestCase> exampleList;
  private List<EditCode> editCodesList;
}
