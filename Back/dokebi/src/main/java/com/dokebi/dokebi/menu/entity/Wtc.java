package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Builder

    public Wtc(int wtcId, String wtcName) {
        this.wtcId = wtcId;
        this.wtcName = wtcName;
    }
}

