package com.ssafy.Algowithme.user.controller;

import com.ssafy.Algowithme.auth.util.JwtUtil;
import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.user.dto.TeamListDto;
import com.ssafy.Algowithme.user.dto.request.LoginRequest;
import com.ssafy.Algowithme.user.dto.response.PageSearchResponse;
import com.ssafy.Algowithme.user.dto.response.UserInfoDetailResponse;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "UserController", description = "UserController API 목록")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    @Operation(summary = "로그인 기능", description = "Github API를 통해 로그인을 진행한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공",
                    content = {@Content(schema = @Schema(implementation = UserInfoResponse.class))}),
            @ApiResponse(responseCode = "1000", description = "Github Access Token을 가져올 수 없습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1001", description = "해당 유저의 정보를 가져올 수 없습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<UserInfoResponse> login(@RequestBody LoginRequest loginRequest,
                                                  HttpServletResponse response) {
        UserInfoResponse userInfo = userService.login(loginRequest.getCode(), response);

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/logout")
    @Operation(summary = "로그아웃 기능", description = "로그아웃을 진행한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize를 제거하여 request를 요청해주세요.")
    })
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        userService.logout(request, response);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh")
    @Operation(summary = "엑세스 토큰 갱신", description = "Refresh Token을 사용하여 Access Token을 갱신한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Access Token 갱신 성공",
                    content = {@Content(schema = @Schema(implementation = UserInfoResponse.class))}),
            @ApiResponse(responseCode = "1002", description = "Refresh Token이 유효하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1004", description = "Refresh Token에 해당하는 유저가 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<UserInfoResponse> refresh(@CookieValue(name = "algowithme_refreshToken", required = true) String refreshToken,
                                        HttpServletResponse response) {
        UserInfoResponse userInfo = jwtUtil.refreshAccessToken(response, refreshToken);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/info")
    @Operation(summary = "유저 메인페이지 정보 조회", description = "유저가 푼 문제들의 태그, 최근 푼 문제 5개, 최근 접속한 스터디들의 정보를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공",
            content = {@Content(schema = @Schema(implementation = UserInfoDetailResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
            content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<UserInfoDetailResponse> getUserInfoDetail(@AuthenticationPrincipal User user) {
        UserInfoDetailResponse userInfo = userService.getUserInfoDetail(user);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/study")
    @Operation(summary = "유저 스터디 목록 조회", description = "유저가 소속된 스터디그룹의 목록을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 목록 조회 성공",
            content = {@Content(
                    mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = TeamListDto.class))
            )}),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<List<TeamListDto>> getTeamList(@AuthenticationPrincipal User user) {
        List<TeamListDto> teamList = userService.getTeamList(user);
        return ResponseEntity.ok(teamList);
    }

    @GetMapping("/search")
    @Operation(summary = "상단바 검색 기능", description = "유저가 소속된 스터디그룹과 그에 포함된 페이지들의 이름을 검색한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "겅색 성공",
                content = {@Content(schema = @Schema(implementation = PageSearchResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<PageSearchResponse> searchPage(@AuthenticationPrincipal User user,
                                                         @RequestParam String word) {
        PageSearchResponse searchResult = userService.searchPage(user, word);
        return ResponseEntity.ok(searchResult);
    }
}
