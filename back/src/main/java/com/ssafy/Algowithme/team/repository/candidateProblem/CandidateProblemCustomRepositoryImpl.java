package com.ssafy.Algowithme.team.repository.candidateProblem;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import lombok.RequiredArgsConstructor;

import static com.ssafy.Algowithme.team.entity.QTeam.team;
import static com.ssafy.Algowithme.user.entity.QUser.user;
import static com.ssafy.Algowithme.user.entity.QUserTeam.userTeam;
import static com.ssafy.Algowithme.team.entity.QCandidateProblem.candidateProblem;

@RequiredArgsConstructor
public class CandidateProblemCustomRepositoryImpl implements CandidateProblemCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public CandidateProblem checkAuthCandidateProblem(Integer userId, Long candidateId) {
        return jpaQueryFactory
                .select(Projections.bean(CandidateProblem.class,
                        candidateProblem.id,
                        candidateProblem.team,
                        candidateProblem.problem))
                .from(user)
                .innerJoin(userTeam).on(user.id.eq(userTeam.user.id))
                .innerJoin(team).on(team.id.eq(userTeam.team.id))
                .innerJoin(candidateProblem).on(team.id.eq(candidateProblem.team.id))
                .where(user.id.eq(userId), candidateProblem.id.eq(candidateId))
                .fetchOne();
    }
}
