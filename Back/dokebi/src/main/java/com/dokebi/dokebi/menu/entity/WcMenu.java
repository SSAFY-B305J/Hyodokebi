package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "WcMenu")
@Entity
public class WcMenu {

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    private Menu menu;

    @Column(nullable = false)
    private String menuImg;

}

