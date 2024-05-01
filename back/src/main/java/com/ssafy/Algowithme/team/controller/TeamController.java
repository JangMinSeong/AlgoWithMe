package com.ssafy.Algowithme.team.controller;

import com.ssafy.Algowithme.team.dto.request.ProblemAddRequest;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import com.ssafy.Algowithme.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/problem")
    public ResponseEntity<?> addCandidateProblem(ProblemAddRequest request) {
        return teamService.addCandidateProblem(request);
    }

//    @DeleteMapping("/problem")
//    public ResponseEntity<?> deleteCandidateProblem(ProblemDeleteRequest request) {
//        return teamService.deleteCandidateProblem(request);
//    }
}
