package com.ssafy.Algowithme.page.entity;

import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.common.util.BaseTime;
import com.ssafy.Algowithme.problem.entity.Problem;
import com.ssafy.Algowithme.team.entity.Team;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Builder
public class Page extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="page_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Double orders;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "parent_id")
    private Page parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Page> child;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<WorkspaceTag> tags;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<PersonalCode> personalCodes;

}
