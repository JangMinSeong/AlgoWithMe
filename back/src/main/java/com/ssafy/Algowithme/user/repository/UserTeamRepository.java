package com.ssafy.Algowithme.user.repository;

import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    Optional<UserTeam> findByUserAndTeam(User user, Team team);

    Optional<UserTeam> findByUserIdAndTeamId(Integer userId, Long teamId);
}
