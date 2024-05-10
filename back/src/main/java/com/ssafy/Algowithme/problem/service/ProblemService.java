package com.ssafy.Algowithme.problem.service;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.page.entity.Page;
import com.ssafy.Algowithme.page.repository.PageRepository;
import com.ssafy.Algowithme.problem.dto.ProblemInfo;
import com.ssafy.Algowithme.problem.dto.response.AllProblemResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTagsResponse;
import com.ssafy.Algowithme.problem.dto.response.ProblemByTitleResponse;
import com.ssafy.Algowithme.problem.dto.response.RawProblemResponse;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.entity.RawProblem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.problem.repository.RawProblemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final RawProblemRepository rawProblemRepository;
    private final PageRepository pageRepository;

    public ResponseEntity<AllProblemResponse> getAll() {
        List<Problem> problemList = problemRepository.findAll();
        return ResponseEntity.ok(AllProblemResponse.create(problemList));
    }

    public RawProblemResponse getProblem(Long pageId) {
        //페이지 조회
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.PAGE_NOT_FOUND));

        //문제 페이지 확인
        if(page.getProblem() == null) {
            throw new CustomException(ExceptionStatus.NOT_PROBLEM_PAGE);
        }

        //요약 정보 조회
        Problem problem = problemRepository.findById(page.getProblem().getId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //세부 정보 조회
        RawProblem rawProblem = rawProblemRepository.findById(problem.getUid())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        return RawProblemResponse.create(rawProblem);
    }

    public ProblemByTitleResponse getProblemByTitle(String title, int page) {
        //문제 제목 조회
        List<Problem> problemList = problemRepository.findByNameContaining(title);
        if(problemList.size() == 0) {
            return ProblemByTitleResponse.create(0, 1, 1, new ArrayList<>());
        }

        //조회 결과 수
        int resultCount = problemList.size();

        //전체 페이지 번호
        int totalPages = resultCount/10 + (resultCount%10==0 ? 0 : 1);

        //문제 리스트
        List<ProblemInfo> problemInfoList = new ArrayList<>();
        int startNum = 10 * (page - 1);
        for(int i=startNum; i<startNum+10 && i<problemList.size(); i++) {
            Problem problem = problemList.get(i);
            problemInfoList.add(ProblemInfo.create(problem));
        }

        return ProblemByTitleResponse.create(resultCount, page, totalPages, problemInfoList);
    }

    public ProblemByTagsResponse getProblemByTag(String levels, int page) {
        // 태그 리스트
        String[] levelList = levels.split(" ");
        if(levelList.length == 0) {
            return ProblemByTagsResponse.create(0, 1, 1, new ArrayList<>());
        }

        // 태그 리스트로 문제 조회
        List<Problem> problemList = problemRepository.findByLevelInOrderByLevel(levelList);
        if(problemList.size() == 0) {
            return ProblemByTagsResponse.create(0, 1, 1, new ArrayList<>());
        }

        //조회 결과 수
        int resultCount = problemList.size();

        //전체 페이지 번호
        int totalPages = resultCount/10 + (resultCount%10==0 ? 0 : 1);

        //문제 리스트
        List<ProblemInfo> problemInfoList = new ArrayList<>();
        int startNum = 10 * (page - 1);
        for(int i=startNum; i<startNum+10 && i<problemList.size(); i++) {
            Problem problem = problemList.get(i);
            problemInfoList.add(ProblemInfo.create(problem));
        }

        return ProblemByTagsResponse.create(resultCount, page, totalPages, problemInfoList);
    }
}
