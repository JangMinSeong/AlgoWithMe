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
    private String description;
    private List<String> branches;
    private boolean isPrivate;

    public static RepositoryResponse create (GHRepository repo) {
        List<String> branchNames = new ArrayList<>();
        try {
            for (GHBranch branch : repo.getBranches().values()) {
                branchNames.add(branch.getName());
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new CustomException(ExceptionStatus.GITHUB_ACCESS_DENIED);
        }
        return new RepositoryResponse(
                repo.getName(),
                repo.getDescription(),
                branchNames,
                repo.isPrivate()
        );
    }
}
