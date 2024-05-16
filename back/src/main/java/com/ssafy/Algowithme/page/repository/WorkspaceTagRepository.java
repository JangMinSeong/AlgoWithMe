package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.page.entity.WorkspaceTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceTagRepository extends JpaRepository<WorkspaceTag, Long> {

  List<WorkspaceTag> findByWorkspaceId(Long pageId);
}
