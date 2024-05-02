package com.ssafy.Algowithme.team.repository;

import com.ssafy.Algowithme.team.entity.CandidateProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateProblemRepository extends JpaRepository<CandidateProblem, Long> {
}
