package com.ssafy.Algowithme.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExecutionResponse {
    private int status;
    private String output;
    private int execution_time;
}
