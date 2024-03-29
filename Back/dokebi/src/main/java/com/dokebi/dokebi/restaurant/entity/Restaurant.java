package com.dokebi.dokebi.restaurant.entity;


import com.dokebi.dokebi.menu.entity.Menu;
import jakarta.persistence.*;
import lombok.AccessLevel;
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

    @ManyToOne()
    private Menu menu;

//    @OneToMany(mappedBy = "restaurant")
//    private List<Sr> srs;


}
