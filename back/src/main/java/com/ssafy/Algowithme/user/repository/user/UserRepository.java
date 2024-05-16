package com.ssafy.Algowithme.user.repository.user;

import com.ssafy.Algowithme.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, UserCustomRepository {

  Optional<User> findByGitId(int gitId);
}
