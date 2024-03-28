package com.dokebi.dokebi.restaurant.entity;

import com.dokebi.dokebi.menu.entity.Restaurant;
import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Sr")
@Entity
public class Sr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int srId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vip_id", referencedColumnName = "vip_id")
    private Vip vip;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="restaurant_id", referencedColumnName = "restaurant_id")
    private Restaurant restaurant;
}
