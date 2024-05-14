package com.ssafy.Algowithme.user.repository;

import com.ssafy.Algowithme.user.entity.UserProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProblemRepository extends JpaRepository<UserProblem, Long> {
    Optional<UserProblem> findByUserIdAndProblemId(Integer userId, Long problemId);
}
