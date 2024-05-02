package com.ssafy.Algowithme.code.repository;

import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.page.entity.Workspace;
import com.ssafy.Algowithme.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonalCodeRepository extends JpaRepository<PersonalCode, Long> {
    List<Long> findAllIdsByWorkspaceAndUserAndDeletedFalseOrderByIdAsc(Workspace workspace, User user);
}
