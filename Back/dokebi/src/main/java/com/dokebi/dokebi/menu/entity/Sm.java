package com.dokebi.dokebi.menu.entity;

import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.sql.results.graph.Fetch;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Sm")
@Entity
public class Sm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vip_id",referencedColumnName = "vip_id")
    private Vip vip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    @Builder
    public Sm(int smId, Vip vip, Menu menu) {
        this.smId = smId;
        this.vip = vip;
        this.menu = menu;
    }
}
