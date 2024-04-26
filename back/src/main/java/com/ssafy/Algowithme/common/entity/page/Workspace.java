package com.ssafy.Algowithme.common.entity.page;

import com.ssafy.Algowithme.common.entity.PersonalCode;
import com.ssafy.Algowithme.common.entity.Problem;
import com.ssafy.Algowithme.common.entity.WorkspaceTag;
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
