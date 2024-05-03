package com.ssafy.Algowithme.user.repository.user;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Algowithme.user.dto.RecentTeamDto;
import com.ssafy.Algowithme.user.dto.SolvedTagCountDto;
import com.ssafy.Algowithme.user.dto.StudiedProblemDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.Algowithme.user.entity.QUser.user;
import static com.ssafy.Algowithme.user.entity.QUserTeam.userTeam;
import static com.ssafy.Algowithme.team.entity.QTeam.team;
import static com.ssafy.Algowithme.page.entity.QPage.page;
import static com.ssafy.Algowithme.page.entity.QWorkspaceTag.workspaceTag;
import static com.ssafy.Algowithme.user.entity.QUserProblem.userProblem;
import static com.ssafy.Algowithme.problem.entity.QProblem.problem;

@RequiredArgsConstructor
@Slf4j
public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SolvedTagCountDto> getSolvedTagChart(Integer userId) {
        List<Tuple> tuple = jpaQueryFactory.select(workspaceTag.tag, ExpressionUtils.count(workspaceTag))
                .from(user)
                .innerJoin(userTeam).on(user.id.eq(userTeam.user.id))
                .innerJoin(team).on(team.id.eq(userTeam.team.id))
                .innerJoin(page).on(team.id.eq(page.team.id))
                .innerJoin(workspaceTag).on(page.id.eq(workspaceTag.workspace.id))
                .where(user.id.eq(userId))
                .groupBy(workspaceTag.tag)
                .having(workspaceTag.tag.isNotNull())
                .fetch();

        List<SolvedTagCountDto> result = new ArrayList<>();

        tuple.forEach(t -> result.add(SolvedTagCountDto.builder()
                .tag(t.get(workspaceTag.tag))
                .count(t.get(1, Long.class)).build()));

        return result;
    }

    @Override
    public List<StudiedProblemDto> getStudiedProblem(Integer userId) {
        return jpaQueryFactory
                .select(Projections.bean(StudiedProblemDto.class,
                        problem.provider,
                        problem.number,
                        problem.name,
                        problem.url))
                .from(user)
                .innerJoin(userProblem).on(user.id.eq(userProblem.user.id))
                .innerJoin(problem).on(problem.id.eq(userProblem.problem.id))
                .where(user.id.eq(userId))
                .orderBy(userProblem.updatedAt.desc())
                .limit(5)
                .fetch();
    }

    @Override
    public List<RecentTeamDto> getRecentTeam(Integer userId) {
        return jpaQueryFactory
                .select(Projections.bean(RecentTeamDto.class,
                        team.id,
                        team.name,
                        team.imageUrl,
                        userTeam.visitedAt))
                .from(user)
                .innerJoin(userTeam).on(user.id.eq(userTeam.user.id))
                .innerJoin(team).on(team.id.eq(userTeam.team.id))
                .where(user.id.eq(userId), team.deleted.eq(false))
                .orderBy(userTeam.visitedAt.desc())
                .fetch();
    }
}
