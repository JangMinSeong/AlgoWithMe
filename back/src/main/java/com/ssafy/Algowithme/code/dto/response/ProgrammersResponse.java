package com.ssafy.Algowithme.code.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgrammersResponse {
    private int status;
    private String error;
    private List<ProgrammersDetail> results;
}
