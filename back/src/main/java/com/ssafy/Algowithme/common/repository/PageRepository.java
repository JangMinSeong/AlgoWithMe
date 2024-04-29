package com.ssafy.Algowithme.common.repository;

import com.ssafy.Algowithme.common.entity.page.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {
}
