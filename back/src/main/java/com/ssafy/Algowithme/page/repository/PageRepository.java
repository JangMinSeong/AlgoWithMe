package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.page.entity.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Long> {
    // parentId가 null이 아닐 때 사용하는 메서드
    int countByTeamIdAndParentId(Long teamId, Long parentId);

    // parentId가 null일 때 사용하는 메서드
    int countByTeamIdAndParentIsNull(Long teamId);

    // 팀 내 페이지 조회 (parentId: 오름차순, orders: 오름차순)
    List<Page> findByTeamIdAndDeletedOrderByParentIdAscOrdersAsc(Long teamId, boolean deleted);
}
