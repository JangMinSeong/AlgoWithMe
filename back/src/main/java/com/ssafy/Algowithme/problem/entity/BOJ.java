package com.ssafy.Algowithme.problem.entity;

import com.ssafy.Algowithme.problem.dto.TestCase;
import jakarta.persistence.Id;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Document(collection = "BOJ")
public class BOJ {
    @Id
    private String id;
    private int number;
    private String level;
    private int limit_time;
    private List<TestCase> test_case;
}
