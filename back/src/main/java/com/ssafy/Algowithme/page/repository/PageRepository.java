package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.page.entity.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Long> {

  List<Page> findByParentIsNullAndDeletedFalse();
  List<Page> findByParentIdAndDeletedFalse(Long pageId);

  int countByTeamIdAndParentIdAndDeletedFalse(Long teamId, Long parentId);

  int countByTeamIdAndParentIsNullAndDeletedFalse(Long teamId);

  List<Page> findByTeamIdAndDeletedOrderByParentIdAscOrdersAsc(Long teamId, boolean deleted);

  List<Page> findByTeamIdAndDeletedAndParentIsNullOrderByOrders(Long id, boolean deleted);

  List<Page> findByParentIdAndDeletedOrderByOrders(Long parentPageId, boolean deleted);
}
