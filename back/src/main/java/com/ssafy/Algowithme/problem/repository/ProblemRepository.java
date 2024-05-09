package com.ssafy.Algowithme.problem.repository;

import com.ssafy.Algowithme.problem.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findByNameContaining(String name);
}
