package com.ssafy.Algowithme.team.repository.candidateProblem;

import com.ssafy.Algowithme.team.entity.CandidateProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateProblemRepository extends JpaRepository<CandidateProblem, Long>, CandidateProblemCustomRepository {
    Optional<CandidateProblem> findByProblemId(Long problemId);
}
