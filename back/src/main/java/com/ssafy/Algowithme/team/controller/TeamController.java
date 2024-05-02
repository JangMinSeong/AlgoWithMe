package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.team.dto.request.CreateTeamRequest;
import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<?>  createTeam(CreateTeamRequest request) {
        return teamService.createTeam(request);
    }

    @PostMapping("/problem")
    public ResponseEntity<?> addCandidateProblem(ProblemAddRequest request) {
        return teamService.addCandidateProblem(request);
    }

}
