package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Wtc")
@Entity
public class Wtc {

    @Id
    @Column(name="wtc_id")
    private int wtcId;

    @Column(nullable = false)
    private String wtcName;

    @OneToMany(mappedBy = "wtc")
    private List<Menu> menus;


}

