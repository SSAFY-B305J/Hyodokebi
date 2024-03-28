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
    @Column(name="menu_id")
    private int menuId;

    @Column(nullable = false)
    private String menuImg;

    @OneToOne(fetch = FetchType.LAZY)
    private Menu menu;


}

