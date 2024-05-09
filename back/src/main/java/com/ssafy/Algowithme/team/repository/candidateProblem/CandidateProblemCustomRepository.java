package com.ssafy.Algowithme.team.repository.candidateProblem;

import com.ssafy.Algowithme.team.entity.CandidateProblem;

public interface CandidateProblemCustomRepository {
    CandidateProblem checkAuthCandidateProblem(Integer userId, Long CandidateId);
}
