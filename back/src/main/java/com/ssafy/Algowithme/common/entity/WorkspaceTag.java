package com.ssafy.Algowithme.common.entity;

import com.ssafy.Algowithme.common.entity.enums.Tag;
import com.ssafy.Algowithme.common.entity.page.Workspace;
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
    private Workspace workspace;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Tag tag;
}
