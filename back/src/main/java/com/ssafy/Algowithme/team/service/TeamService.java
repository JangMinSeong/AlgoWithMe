package com.ssafy.Algowithme.team.service;

import com.ssafy.Algowithme.common.config.AES128Config;
import com.ssafy.Algowithme.common.exception.CustomException;
import com.ssafy.Algowithme.common.exception.ExceptionStatus;
import com.ssafy.Algowithme.common.util.S3Util;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.problem.repository.ProblemRepository;
import com.ssafy.Algowithme.team.dto.ImageUrlDto;
import com.ssafy.Algowithme.team.dto.request.AddProblemRequest;
import com.ssafy.Algowithme.team.dto.response.AddProblemResponse;
import com.ssafy.Algowithme.team.dto.response.InviteUrlResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoDetailResponse;
import com.ssafy.Algowithme.team.dto.response.TeamInfoResponse;
import com.ssafy.Algowithme.team.entity.CandidateProblem;
import com.ssafy.Algowithme.team.entity.Team;
import com.ssafy.Algowithme.team.repository.candidateProblem.CandidateProblemRepository;
import com.ssafy.Algowithme.team.repository.team.TeamRepository;
import com.ssafy.Algowithme.user.dto.response.UserInfoResponse;
import com.ssafy.Algowithme.user.entity.User;
import com.ssafy.Algowithme.user.entity.UserTeam;
import com.ssafy.Algowithme.user.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamService {

    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;
    private final ProblemRepository problemRepository;
    private final CandidateProblemRepository candidateProblemRepository;
    private final AES128Config aes128Config;
    private final S3Util s3Util;

    @Transactional
    public TeamInfoResponse createTeam(User user) {
        //팀 생성
        Team team = teamRepository.save(Team.builder()
                        .name("이름 없는 스터디")
                        .canRead(false)
                        .build());
        //팀멤버 저장
        userTeamRepository.save(UserTeam.builder()
                        .user(user)
                        .team(team)
                        .manager(true)
                        .visitedAt(LocalDateTime.now())
                        .build());

        return TeamInfoResponse.create(team.getId());
    }

    @Transactional
    public AddProblemResponse addCandidateProblem(AddProblemRequest request, User user) {
        //팀 멤버 확인
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), request.getTeamId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        //문제 중복 검사
        Optional<CandidateProblem> candidateProblemOptional = candidateProblemRepository.findByProblemId(request.getProblemId());
        if(candidateProblemOptional.isPresent()) {
            throw new CustomException(ExceptionStatus.CANDIDATE_PROBLEM_ALREADY_EXIST);
        }

        //문제 조회
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.PROBLEM_NOT_FOUND));

        //문제 후보 추가
        CandidateProblem candidateProblem = candidateProblemRepository.save(CandidateProblem.builder()
                                                                            .team(userTeam.getTeam())
                                                                            .problem(problem)
                                                                            .build());

        return AddProblemResponse.create(candidateProblem);
    }

    @Transactional
    public void deleteCandidateProblem(User user, Long candidateId) {
        CandidateProblem candidateProblem = candidateProblemRepository.checkAuthCandidateProblem(user.getId(), candidateId);

        if(candidateProblem == null) {
            throw new CustomException(ExceptionStatus.CANDIDATE_PROBLEM_DELETE_UNAUTHORIZED);
        }
        candidateProblemRepository.delete(candidateProblem);
    }

    public InviteUrlResponse createInviteUrl(Long teamId, User user) {
        Team team = teamRepository.findByIdAndDeletedFalse(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));
        userTeamRepository.findByUserAndTeam(user, team)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_INVITE_UNAUTHORIZED));
        return new InviteUrlResponse(aes128Config.encryptAes("team" + "/" + teamId + "/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))));
    }

    @Transactional
    public void addTeamMember(String encrypted, User user) {
        log.info("in add team member");
        String decrypted = aes128Config.decryptAes(encrypted);
        String[] data = decrypted.split("/");
        Long teamId = Long.parseLong(data[1]);
        LocalDateTime createdAt = LocalDateTime.parse(data[2], DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        if(LocalDateTime.now().isAfter(createdAt.plusDays(1)))
            throw new CustomException(ExceptionStatus.TEAM_INVITE_URL_EXPIRED);
        Team team = teamRepository.findByIdAndDeletedFalse(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));
        Optional<UserTeam> userTeam = userTeamRepository.findByUserAndTeam(user, team);
        if(userTeam.isEmpty()) {
            userTeamRepository.save(UserTeam.builder()
                    .user(user)
                    .team(team)
                    .manager(false)
                    .visitedAt(LocalDateTime.now())
                    .build());
        }
    }

    @Transactional
    public TeamInfoDetailResponse getTeamInfoDetail(User user, Long teamId) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        userTeam.setVisitedAt(LocalDateTime.now());
        userTeamRepository.save(userTeam);

        return TeamInfoDetailResponse.builder()
                .teamId(teamId)
                .name(team.getName())
                .imageUrl(team.getImageUrl())
                .joinDay((int) Duration.between(userTeam.getCreatedAt(), LocalDateTime.now()).toDays())
                .chart(teamRepository.getSolvedTagChart(teamId))
                .solvedProblems(teamRepository.getSolvedProblem(teamId))
                .candidateProblems(teamRepository.getCandidateProblem(teamId))
                .ranking(teamRepository.getRank(teamId))
                .manager(userTeam.isManager())
                .build();
    }

    @Transactional
    public ImageUrlDto changeTeamImage(User user, Long teamId, MultipartFile file) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        String url = s3Util.uploadVideo(file, "/" + teamId , "profile");

        team.setImageUrl(url);
        teamRepository.save(team);

        return ImageUrlDto.builder().url(url).build();
    }

    @Transactional
    public void changeTeamName(User user, Long teamId, String name) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        if(!userTeam.isManager()) {
            throw new CustomException(ExceptionStatus.USER_TEAM_UNAUTHORIZED);
        }

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        team.setName(name);
        teamRepository.save(team);
    }

    @Transactional
    public void deleteTeam(User user, Long teamId) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        if(!userTeam.isManager()) {
            throw new CustomException(ExceptionStatus.USER_TEAM_UNAUTHORIZED);
        }

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));

        team.setDeleted(true);
        teamRepository.save(team);
    }

    @Transactional
    public void withdrawalTeam(User user, Long teamId) {
        UserTeam userTeam = userTeamRepository.findByUserIdAndTeamId(user.getId(), teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.USER_TEAM_NOT_FOUND));

        if(userTeam.isManager()) {
            throw new CustomException(ExceptionStatus.USER_TEAM_UNAUTHORIZED);
        }

        userTeamRepository.delete(userTeam);
    }

    public List<UserInfoResponse> getTeamMembers(Long teamId, User user) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TEAM_NOT_FOUND));
        userTeamRepository.findByUserAndTeam(user, team)
                .orElseThrow(() -> new CustomException(ExceptionStatus.GET_MEMBERS_UNAUTHORIZED));
        return userTeamRepository.findAllByTeamId(teamId).stream()
                .map(UserTeam::getUser)
                .map(UserInfoResponse::fromEntity)
                .toList();
    }
}
