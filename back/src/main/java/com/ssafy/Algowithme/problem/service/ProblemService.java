package com.ssafy.Algowithme.problem.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.RawProblemResponse;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final RawProblemRepository rawProblemRepository;

    public ResponseEntity<AllProblemResponse> getAll() {
        List<Problem> problemList = problemRepository.findAll();
        return ResponseEntity.ok(AllProblemResponse.create(problemList));
    }

    public RawProblemResponse getProblem(Long problemId) {
        //요약 정보 조회
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //세부 정보 조회
        RawProblem rawProblem = rawProblemRepository.findById(problem.getUid())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        return RawProblemResponse.create(rawProblem);
    }
}
