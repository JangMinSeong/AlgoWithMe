package com.ssafy.Algowithme.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionStatus {

  // user(10)
  GITHUB_TOKEN_NOT_FOUND(1000, "Github Access Token을 가져올 수 없습니다."),
  GITHUB_USER_NOT_FOUND(1001, "해당 유저의 정보를 가져올 수 없습니다."),
  REFRESH_TOKEN_IS_NOT_VALID(1002, "Refresh Token이 유효하지 않습니다."),
  USER_MISMATCH(1003, "사용자가 일치하지 않습니다."),
  USER_NOT_FOUND(1004, "유저가 존재하지 않습니다."),
  AUTHORIZATION_USER_NOT_FOUND(1005, "Authorization에 해당하는 사용자를 찾을 수 없습니다."),
  USER_TEAM_NOT_FOUND(1006, "해당 사용자가 소속된 스터디 그룹이 아닙니다."),

  // team(11)
  TEAM_NOT_FOUND(1100, "팀이 존재하지 않습니다."),
  TEAM_INVITE_URL_EXPIRED(1101, "초대 링크가 유효하지 않습니다."),
  TEAM_INVITE_UNAUTHORIZED(1102, "초대 권한이 없습니다."),
  CANDIDATE_PROBLEM_DELETE_UNAUTHORIZED(1103, "풀어볼 문제 삭제 권한이 없습니다."),
  CANDIDATE_PROBLEM_ALREADY_EXIST(1104, "이미 존재하는 문제 후보입니다."),
  GET_MEMBERS_UNAUTHORIZED(1105, "팀원 조회 권한이 없습니다."),
  USER_TEAM_UNAUTHORIZED(1106, "스터디 생성자만 사용 가능한 기능입니다."),
  USER_TEAM_LEAVE_NOT_ACCEPTED(1107, "스터디 생성자는 스터디 탈퇴를 할 수 없습니다."),

  // page(12)
  PAGE_NOT_FOUND(1200, "페이지가 존재하지 않습니다."),
  USERWORKSPACE_NOT_FOUND(1201, "개인메모가 존재하지 않습니다."),
  PARENT_PAGE_CANNOT_BE_CHILD_PAGE(1202, "자신의 자식페이지를 부모페이지로 할 수 없습니다."),
  NOT_PROBLEM_PAGE(1203, "문제 페이지가 아닙니다."),
  USERWORKSPACE_USER_MISMATCH(1204, "유저의 개인메모가 아닙니다."),

  // code(13),
  PERSONAL_CODE_NOT_FOUND(1300, "코드가 존재하지 않습니다."),

  //problem(14)
  PROBLEM_NOT_FOUND(1400, "문제가 존재하지 않습니다."),

  //openvidu/websocket(15)
  OPENVIDU_SESSION_NOT_FOUND(15000, "오픈비두 세션이 없습니다."),

  //github(16)
  GITHUB_TOKEN_BAD_CREDENTIALS(1600, "깃허브 토큰이 잘못되었거나 만료되었습니다."),
  GITHUB_ACCESS_DENIED(1601, "사용 중인 깃허브 토큰에 필요한 권한이 없습니다."),
  GITHUB_REPOSITORY_NOT_FOUND(1602, "깃허브 리포지토리가 존재하지 않습니다."),

  //aes128(17)
  ENCRYPTION_FAILED(1700, "암호화에 실패했습니다."),
  DECRYPTION_FAILED(1701, "복호화에 실패했습니다."),

  //S3(18)
  S3_UPLOAD_FAILED(1800, "S3 파일 업로드에 실패했습니다."),
  ;

  private final int code;
  private final String message;
}
