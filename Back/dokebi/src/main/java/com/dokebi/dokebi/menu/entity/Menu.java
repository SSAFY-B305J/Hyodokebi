package com.dokebi.dokebi.menu.entity;


import com.dokebi.dokebi.restaurant.entity.Restaurant;
import jakarta.persistence.*;
import lombok.AccessLevel;
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
    @Column(name="menu_id")
    private int menuId;


    @Column(nullable = false)
    private String menuName;

    @ManyToOne
    private Cate cate;

    @OneToMany(mappedBy = "menu")
    private List<Sm> sms;

    @OneToMany(mappedBy = "menu")
    private List<Restaurant> restaurants;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "menu")
    private WcMenu wcMenu;



}
