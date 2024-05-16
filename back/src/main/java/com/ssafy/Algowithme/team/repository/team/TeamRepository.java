package com.ssafy.Algowithme.team.repository.team;

import com.ssafy.Algowithme.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>, TeamCustomRepository {

  Optional<Team> findByIdAndDeletedFalse(Long id);
}
