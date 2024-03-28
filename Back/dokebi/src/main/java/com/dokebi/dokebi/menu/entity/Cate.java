package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Cate")
@Entity
public class Cate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cate_id")
    private int cateId;

    @Column(nullable = false)
    private String cateImage;

    @Column(nullable = false)
    private String cateName;

    @OneToMany(mappedBy = "cate")
    private List<Menu> menus;

}

