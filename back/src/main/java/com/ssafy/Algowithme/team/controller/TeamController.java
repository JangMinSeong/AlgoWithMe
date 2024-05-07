package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.team.dto.request.CreateTeamRequest;
import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.dto.response.TeamInfoDetailResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoResponse;
import com.ssafy.Algowithme.team.service.TeamService;
import com.ssafy.Algowithme.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<TeamInfoResponse>  createTeam(@AuthenticationPrincipal User user, @RequestBody CreateTeamRequest request) {
        TeamInfoResponse response = teamService.createTeam(user, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/problem")
    public ResponseEntity<Void> addCandidateProblem(@RequestBody ProblemAddRequest request) {
        teamService.addCandidateProblem(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<TeamInfoDetailResponse> getTeamInfoDetail(@AuthenticationPrincipal User user,
                                                                    @PathVariable Long teamId) {
        TeamInfoDetailResponse teamInfo = teamService.getTeamInfoDetail(user, teamId);
        return ResponseEntity.ok(teamInfo);
    }
}
