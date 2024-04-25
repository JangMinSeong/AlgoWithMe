package com.ssafy.Algowithme.common.entity.page;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("D")
@Getter
@Setter
public class Document extends Page {
    private String title;
}
