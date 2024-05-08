package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.page.entity.UserWorkspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserWorkspaceRepository extends JpaRepository<UserWorkspace, Long> {
    Optional<UserWorkspace> findByWorkspaceIdAndUserId(Long pageId, Integer id);
}
