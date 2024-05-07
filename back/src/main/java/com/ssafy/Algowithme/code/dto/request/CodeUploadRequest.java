package com.ssafy.Algowithme.code.dto.request;

import com.ssafy.Algowithme.code.type.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeUploadRequest {
    private String path;
    private String fileName;
    private Language language;
    private String content;
    private String commitMessage;
}
