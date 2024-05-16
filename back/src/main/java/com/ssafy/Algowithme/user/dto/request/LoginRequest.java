package com.ssafy.Algowithme.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "로그인 Request")
public class LoginRequest {

  @Schema(description = "코드", type = "String", example = "477c446ba67e03bb7c53")
  private String code;
}
