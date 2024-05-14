package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.team.dto.request.AddProblemRequest;
import com.ssafy.Algowithme.team.dto.response.AddProblemResponse;
import com.ssafy.Algowithme.team.dto.response.InviteUrlResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoDetailResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoResponse;
import com.ssafy.Algowithme.team.service.TeamService;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
@Tag(name = "TeamController", description = "TeamController API 목록")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    @Operation(summary = "스터디 생성", description = "스터디를 생성한 후 teamId 를 반환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "생성 성공", content = {@Content(schema = @Schema(implementation = TeamInfoResponse.class))}),
            @ApiResponse(responseCode = "400", description = "생성 실패"),
    })
    public ResponseEntity<TeamInfoResponse> createTeam(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(teamService.createTeam(user));
    }

    @PostMapping("/problem")
    @Operation(summary = "풀어볼 문제 추가", description = "선택한 문제를 풀어볼 문제에 추가한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "추가 성공", content = {@Content(schema = @Schema(implementation = AddProblemResponse.class))}),
            @ApiResponse(responseCode = "400", description = "추가 실패"),
    })
    public ResponseEntity<AddProblemResponse> addCandidateProblem(@RequestBody AddProblemRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(teamService.addCandidateProblem(request, user));
    }

    @DeleteMapping("/problem")
    @Operation(summary = "풀어볼 문제 삭제", description = "선택한 풀어볼 문제를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "풀어볼 문제 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1103", description = "풀어볼 문제 삭제 권한이 없습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> deleteCandidateProblem(@AuthenticationPrincipal User user,
                                                       @RequestBody Long candidateId) {
        teamService.deleteCandidateProblem(user, candidateId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/invite/{teamId}")
    public ResponseEntity<InviteUrlResponse> createInviteUrl(@PathVariable("teamId") Long teamId, @AuthenticationPrincipal User user) {
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

    @PutMapping("/image/{teamId}")
    @Operation(summary = "스터디 그룹 이미지 변경", description = "스터디 그룹의 이미지를 변경한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 그룹 이미지 변경 성공. 이미지 url 반환.",
                content = {@Content(schema = @Schema(implementation = String.class))}),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1006", description = "해당 사용자가 소속된 스터디 그룹이 아닙니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1800", description = "S3 파일 업로드에 실패했습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<String> changeTeamImage(@AuthenticationPrincipal User user,
                                                   @PathVariable Long teamId,
                                                   @RequestParam(value = "file") MultipartFile file) {
        String url = teamService.changeTeamImage(user, teamId, file);
        return ResponseEntity.ok(url);
    }

    @PutMapping("/name/{teamId}")
    @Operation(summary = "스터디 그룹 이름 변경", description = "스터디 그룹의 이름을 변경한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 그룹 이름 변경 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1006", description = "해당 사용자가 소속된 스터디 그룹이 아닙니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1106", description = "스터디 생성자만 사용 가능한 기능입니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> changeTeamName(@AuthenticationPrincipal User user,
                                                 @PathVariable("teamId") Long teamId,
                                                 @RequestBody String name) {
        teamService.changeTeamName(user, teamId, name);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamId}")
    @Operation(summary = "스터디 그룹 삭제", description = "스터디 그룹을 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 그룹 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1006", description = "해당 사용자가 소속된 스터디 그룹이 아닙니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1100", description = "팀이 존재하지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1106", description = "스터디 생성자만 사용 가능한 기능입니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> deleteTeam(@AuthenticationPrincipal User user,
                                           @PathVariable Long teamId) {
        teamService.deleteTeam(user, teamId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/withdrawal/{teamId}")
    @Operation(summary = "스터디 그룹 탈퇴", description = "스터디 그룹에서 탍퇴한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스터디 그룹 탈퇴 성공"),
            @ApiResponse(responseCode = "500", description = "Authorize가 존재하지 않거나 올바르지 않습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1006", description = "해당 사용자가 소속된 스터디 그룹이 아닙니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))}),
            @ApiResponse(responseCode = "1107", description = "스터디 생성자는 스터디 탈퇴를 할 수 없습니다.",
                    content = {@Content(schema = @Schema(implementation = ErrorResponse.class))})
    })
    public ResponseEntity<Void> withdrawalTeam(@AuthenticationPrincipal User user,
                                               @PathVariable Long teamId) {
        teamService.withdrawalTeam(user, teamId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<List<UserInfoResponse>> getTeamMembers(@PathVariable("teamId") Long teamId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(teamService.getTeamMembers(teamId, user));
    }
}
