package com.ssafy.Algowithme.code.controller;

import com.ssafy.Algowithme.code.dto.request.ExecuteRequest;
import com.ssafy.Algowithme.code.dto.request.MarkRequest;
import com.ssafy.Algowithme.code.dto.request.SaveCodeRequest;
import com.ssafy.Algowithme.code.dto.response.*;
import com.ssafy.Algowithme.code.service.CodeService;
import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeController {

  private final CodeService codeService;

  @PostMapping("/{pageId}")
  @Operation(summary = "개인 코드 생성", description = "코드를 생성하고 id를 반환한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "생성 성공", content = {
          @Content(schema = @Schema(implementation = Long.class))}),
      @ApiResponse(responseCode = "500", description = "생성 실패")
  })
  public ResponseEntity<Long> createPersonalCode(@PathVariable("pageId") Long pageId,
                                                 @AuthenticationPrincipal User user) {
    return ResponseEntity.ok(codeService.createPersonalCode(pageId, user));
  }

  @DeleteMapping("/{codeId}")
  @Operation(summary = "개인 코드 삭제", description = "코드 아이디로 코드를 삭제한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "삭제 성공", content = {
          @Content(schema = @Schema(implementation = String.class))}),
      @ApiResponse(responseCode = "1300", description = "코드가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "삭제 실패")
  })
  public ResponseEntity<String> deletePersonalCode(@PathVariable("codeId") Long codeId,
                                                   @AuthenticationPrincipal User user) {
    codeService.deletePersonalCode(codeId, user);
    return ResponseEntity.ok("Success");
  }

  @PostMapping("/save")
  @Operation(summary = "개인 코드 저장", description = "코드 아이디로 코드 정보를 업데이트 한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "저장 성공", content = {
          @Content(schema = @Schema(implementation = String.class))}),
      @ApiResponse(responseCode = "1300", description = "코드가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "1003", description = "사용자가 일치하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "저장 실패")
  })
  public ResponseEntity<String> savePersonalCode(@RequestBody SaveCodeRequest request,
                                                 @AuthenticationPrincipal User user) {
    codeService.savePersonalCode(request, user);
    return ResponseEntity.ok("Success");
  }

  @PostMapping("/cache")
  @Operation(summary = "개인 코드 캐시에 저장", description = "코드 정보를 캐시에 저장한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "저장 성공", content = {
          @Content(schema = @Schema(implementation = String.class))}),
      @ApiResponse(responseCode = "500", description = "저장 실패")
  })
  public ResponseEntity<String> savePersonalCodeToCache(@RequestBody SaveCodeRequest request) {
    codeService.savePersonalCodeToCache(request);
    return ResponseEntity.ok("Success");
  }

  @GetMapping("/{codeId}")
  @Operation(summary = "개인 코드 조회", description = "코드 아이디로 코드 정보를 조회한다. 캐시에서 조회한 뒤 없을 시 DB에서 조회한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "조회 성공", content = {
          @Content(schema = @Schema(implementation = PersonalCodeResponse.class))}),
      @ApiResponse(responseCode = "1300", description = "코드가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "조회 실패")
  })
  public ResponseEntity<PersonalCodeResponse> getPersonalCode(@PathVariable("codeId") Long codeId) {
    return ResponseEntity.ok(codeService.getPersonalCode(codeId));
  }

  @GetMapping("/codeList")
  @Operation(summary = "자기 자신 코드 리스트 조회", description = "페이지에서 자기 자신의 코드 리스트를 조회한다. 존재 하는 코드가 없으면 코드를 생성하고 정보를 반환한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "조회 성공", content = {
          @Content(schema = @Schema(implementation = CodeByPageAndUserResponse.class))}),
      @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "조회 실패")
  })
  public ResponseEntity<CodeByPageAndUserResponse> getCodeByPage(
      @RequestParam("pageId") Long pageId, @AuthenticationPrincipal User user) {
    return ResponseEntity.ok(codeService.getCodeByPage(pageId, user));
  }

  @GetMapping("/user")
  @Operation(summary = "다른 사용자의 코드 리스트 조회", description = "페이지에서 다른 사용자의 코드 리스트를 조회한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "조회 성공", content = {
          @Content(schema = @Schema(implementation = CodeByPageAndUserResponse.class))}),
      @ApiResponse(responseCode = "1004", description = "유저가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "조회 실패")
  })
  public ResponseEntity<CodeByPageAndUserResponse> getPersonalCodeByPageAndUser(
      @RequestParam("pageId") Long pageId, @RequestParam("userId") Integer userId) {
    return ResponseEntity.ok(codeService.getPersonalCodeByPageAndUser(pageId, userId));
  }

  @PostMapping("/execute")
  @Operation(summary = "코드 실행", description = "사용자가 직접 입력한 값으로 코드를 실행한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "실행 성공", content = {
          @Content(schema = @Schema(implementation = ExecutionResponse.class))}),
      @ApiResponse(responseCode = "1004", description = "유저가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "1200", description = "페이지가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "1300", description = "코드가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "실행 실패")
  })
  public Mono<ResponseEntity<ExecutionResponse>> execute(@RequestBody ExecuteRequest request) {
    return codeService.executeCode(request)
        .map(response -> ResponseEntity.ok().body(response));
  }

  @PostMapping("/boj")
  @Operation(summary = "백준 문제 채점", description = "몽고DB에서 문제 정보를 조회하고 테스트 케이스를 채점한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "실행 성공", content = {
          @Content(schema = @Schema(implementation = BOJResponse.class))}),
      @ApiResponse(responseCode = "1400", description = "문제가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "실행 실패")
  })
  public Mono<ResponseEntity<BOJResponse>> markBOJ(@RequestBody MarkRequest request) {
    return codeService.markBOJ(request)
        .map(response -> ResponseEntity.ok().body(response));
  }

  @PostMapping("/swea")
  @Operation(summary = "SWEA 문제 채점", description = "몽고DB에서 문제 정보를 조회하고 테스트 케이스를 채점한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "실행 성공", content = {
          @Content(schema = @Schema(implementation = SWEAResponse.class))}),
      @ApiResponse(responseCode = "1400", description = "문제가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "실행 실패")
  })
  public Mono<ResponseEntity<SWEAResponse>> markSwea(@RequestBody MarkRequest request) {
    return codeService.markSWEA(request)
        .map(response -> ResponseEntity.ok().body(response));
  }

  @PostMapping("/programmers")
  @Operation(summary = "프로그래머스 문제 채점", description = "몽고DB에서 문제 정보를 조회하고 테스트 케이스를 채점한다.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "실행 성공", content = {
          @Content(schema = @Schema(implementation = ProgrammersResponse.class))}),
      @ApiResponse(responseCode = "1400", description = "문제가 존재하지 않습니다.", content = {
          @Content(schema = @Schema(implementation = ErrorResponse.class))}),
      @ApiResponse(responseCode = "500", description = "실행 실패")
  })
  public Mono<ResponseEntity<ProgrammersResponse>> markProgrammers(
      @RequestBody MarkRequest request) {
    return codeService.markProgrammers(request)
        .map(response -> ResponseEntity.ok().body(response));
  }
}
