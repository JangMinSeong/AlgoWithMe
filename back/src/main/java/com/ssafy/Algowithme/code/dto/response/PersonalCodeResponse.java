package com.ssafy.Algowithme.code.dto.response;

import com.ssafy.Algowithme.code.entity.Code;
import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.code.type.Language;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class PersonalCodeResponse {

  private Long id;
  private Language language;
  private String code;
//    private List<CodeCommentResponse> comments;

  static public PersonalCodeResponse fromEntity(PersonalCode entity) {
    return new PersonalCodeResponse(
        entity.getId(),
        entity.getLanguage(),
        entity.getCode()
//                entity.getCodeComments().stream().map(CodeCommentResponse::fromEntity).toList()
    );
  }

  static public PersonalCodeResponse fromEntity(Code entity) {
    return new PersonalCodeResponse(
        entity.getId(),
        entity.getLanguage(),
        entity.getCode()
//                entity.getCodeComments().stream().map(CodeCommentResponse::fromEntity).toList()
    );
  }
}
