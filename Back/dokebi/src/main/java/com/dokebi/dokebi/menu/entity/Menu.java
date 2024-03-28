package com.dokebi.dokebi.menu.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Menu")
@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuId;

    @Column(nullable = false)
    private String menuName;

    @Column(nullable = false)
    private int cate_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_id", referencedColumnName = "cate_id")
    private Cate cate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wtc_id", referencedColumnName = "wtc_id")
    private Wtc wtc;


    @Builder
    public Menu(int menuId, String menuName) {
        this.menuId = menuId;
        this.menuName = menuName;
    }
}
