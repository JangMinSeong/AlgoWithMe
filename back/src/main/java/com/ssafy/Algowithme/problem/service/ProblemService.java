package com.ssafy.Algowithme.problem.service;

import com.ssafy.Algowithme.common.exception.ErrorResponse;
import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemResponse;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.BOJRepository;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final BOJRepository bojRepository;
    private final ProblemRepository problemRepository;
    private final RawProblemRepository rawProblemRepository;


    public ProblemResponse getProblem(String provider, String problemId) throws BadRequestException {
        if (provider.equals("BOJ")) {
            return new ProblemResponse(bojRepository.findById(problemId).orElseThrow(() -> new BadRequestException("없는 문제입니다.")));
        }

        throw new BadRequestException("잘못된 문제 사이트입니다.");
    }


    public ResponseEntity<AllProblemResponse> getAll() {
        List<Problem> problemList = problemRepository.findAll();
        return ResponseEntity.ok(AllProblemResponse.create(problemList));
    }
}
