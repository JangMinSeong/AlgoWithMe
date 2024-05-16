package com.ssafy.Algowithme.page.entity;

import com.ssafy.Algowithme.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class UserWorkspace { // 개인 메모장

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "memo_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id")
  private Page workspace;

  @Column(columnDefinition = "TEXT")
  private String content;
}
