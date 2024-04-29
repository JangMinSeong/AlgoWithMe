package com.ssafy.Algowithme.page.repository;

import com.ssafy.Algowithme.page.entity.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, Long> {
}
