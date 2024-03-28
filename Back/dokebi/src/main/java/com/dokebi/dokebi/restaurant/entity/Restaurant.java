package com.dokebi.dokebi.menu.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Restaurant")
@Entity
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int restaurantId;

    @Column(nullable = false)
    private String restaurantName;

    @Column(nullable = false)
    private String restaurantAddress;

    @Column(nullable = false)
    private String restaurantNumber;

    @Column(nullable = false)
    private String restaurantUrl;

    @Column(nullable = false)
    private float restaurantLat;

    @Column(nullable = false)
    private float restaurantLong;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    @Builder
    public Restaurant(int restaurantId, String restaurantName, String restaurantAddress, String restaurantNumber, String restaurantUrl, float restaurantLat, float restaurantLong, Menu menu) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantNumber = restaurantNumber;
        this.restaurantUrl = restaurantUrl;
        this.restaurantLat = restaurantLat;
        this.restaurantLong = restaurantLong;
        this.menu = menu;
    }
}
