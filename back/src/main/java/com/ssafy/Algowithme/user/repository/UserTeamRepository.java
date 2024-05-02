package com.ssafy.Algowithme.user.repository;

import com.ssafy.Algowithme.user.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
}
