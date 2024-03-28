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

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "wcMenu")
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    /*
    @OneToMany(mappedBy = "vip")
    List<DisLikedMusic> vipDisLikedMusics = new ArrayList<>();

    private boolean isDeleted;
    */
    @Builder
    public WcMenu(int menuId, String menuImg) {
        this.menuId = menuId;
        this.menuImg = menuImg;
    }
}

