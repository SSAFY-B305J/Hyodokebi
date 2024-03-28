package com.dokebi.dokebi.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Mi")
@Entity
public class Mi {

    @Id
    @Column(name="mi_id")
    private int miId;

    @Column(nullable = false)
    private String miName;

    @Builder
    public Mi(int miId, String miName) {
        this.miId = miId;
        this.miName = miName;
    }
}

