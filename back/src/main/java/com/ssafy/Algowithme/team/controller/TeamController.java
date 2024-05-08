package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.dto.response.TeamInfoDetailResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoResponse;
import com.ssafy.Algowithme.team.service.TeamService;
import com.ssafy.Algowithme.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
@Tag(name = "TeamController", description = "TeamController API 목록")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<TeamInfoResponse> createTeam(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(teamService.createTeam(user));
    }

    @PostMapping("/problem")
    public ResponseEntity<Void> addCandidateProblem(@RequestBody ProblemAddRequest request) {
        teamService.addCandidateProblem(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invite/{teamId}")
    public ResponseEntity<String> createInviteUrl(@PathVariable Long teamId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(teamService.createInviteUrl(teamId, user));
    }

    @GetMapping("/member")
    public ResponseEntity<String> addMember(@RequestParam("encrypted") String encrypted, @AuthenticationPrincipal User user){
        teamService.addTeamMember(encrypted, user);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/{teamId}")
    @Operation(summary = "스터디 메인페이지 정보 조회", description = "스터디그룹의 id, 이름, 이미지url, 사용자가 스터디그룹에 들어온 기간, 스터디그룹이 생성한 페이지들의 문제 태그, 최근 수정한 페이지 5개, 풀어볼 문제 목록을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디그룹 정보 조회 성공",
            content = {@Content(schema = @Schema(implementation = TeamInfoDetailResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1006", description = "해당 사용자가 소속된 스터디 그룹이 아닙니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<TeamInfoDetailResponse> getTeamInfoDetail(@AuthenticationPrincipal User user,
                                                                    @PathVariable Long teamId) {
        TeamInfoDetailResponse teamInfo = teamService.getTeamInfoDetail(user, teamId);
        return ResponseEntity.ok(teamInfo);
    }
}
