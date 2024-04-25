package com.ssafy.Algowithme.common.entity;

import com.ssafy.Algowithme.common.entity.enums.Language;
import com.ssafy.Algowithme.common.entity.page.Workspace;
import com.ssafy.Algowithme.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class PersonalCode{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id")
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Language language;

    private String code;

    @OneToMany(mappedBy = "personalCode", cascade = CascadeType.ALL)
    private List<CodeComment> codeComments;
}
