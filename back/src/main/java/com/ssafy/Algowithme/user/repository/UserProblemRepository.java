package com.ssafy.Algowithme.user.repository;

import com.ssafy.Algowithme.user.entity.UserProblem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProblemRepository extends JpaRepository<UserProblem, Long> {
}
