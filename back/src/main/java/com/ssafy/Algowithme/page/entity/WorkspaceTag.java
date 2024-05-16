package com.ssafy.Algowithme.page.entity;

import com.ssafy.Algowithme.problem.type.Tag;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class WorkspaceTag {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "workspace_tag_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "page_id")
  private Page workspace;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private Tag tag;
}
