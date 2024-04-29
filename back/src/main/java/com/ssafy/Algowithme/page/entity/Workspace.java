package com.ssafy.Algowithme.page.entity;

import com.ssafy.Algowithme.code.entity.PersonalCode;
import com.ssafy.Algowithme.problem.entity.Problem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@DiscriminatorValue("W")
@Getter
@Setter
public class Workspace extends Page {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<WorkspaceTag> tags;
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL)
    private List<PersonalCode> personalCodes;
}
