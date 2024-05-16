package com.ssafy.Algowithme.code.dto.response;

import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kohsuke.github.GHBranch;
import org.kohsuke.github.GHRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepositoryResponse {

  private String name;
  private String fullname;
  private String description;
  private boolean isPrivate;

  public static RepositoryResponse create(GHRepository repo) {
    if (repo == null) {
      throw new CustomException(ExceptionStatus.GITHUB_REPOSITORY_NOT_FOUND);
    }
    return new RepositoryResponse(
        repo.getName(),
        repo.getFullName(),
        repo.getDescription(),
        repo.isPrivate()
    );
  }
}
