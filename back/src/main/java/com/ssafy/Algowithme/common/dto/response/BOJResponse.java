package com.ssafy.Algowithme.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BOJResponse {
    private String input;
    private String expected;
    private String got;
    private boolean passed;
    private int execution_time;
}
