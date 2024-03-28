package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Cate")
@Entity
public class Cate {

    @Id
    @Column(name="cate_id")
    private int wtcId;

    @Column(nullable = false)
    private String cateImage;

    @Column(nullable = false)
    private String cateName;

    @Builder
    public Cate(int wtcId, String cateImage, String cateName) {
        this.wtcId = wtcId;
        this.cateImage = cateImage;
        this.cateName = cateName;
    }
}

