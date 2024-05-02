package com.ssafy.Algowithme.code.dto.response;

import com.ssafy.Algowithme.code.entity.CodeComment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeCommentResponse {
    private Long id;
    private String nickname;
    private int line;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    static public CodeCommentResponse fromEntity(CodeComment entity) {
        return new CodeCommentResponse(
                entity.getId(),
                entity.getUser().getNickname(),
                entity.getLine(),
                entity.getContent(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
