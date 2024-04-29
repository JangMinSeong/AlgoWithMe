package com.ssafy.Algowithme.mongo.model;

import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Getter
@Document(collection = "SWEA")
public class SWEA {
    private int number;
    private String level;
    private List<Integer> limit_time; // C, C++, JAVA, PYTHON
    private String input;
    private String output;
}
