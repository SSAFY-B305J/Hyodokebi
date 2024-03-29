package com.dokebi.dokebi.menu.entity;

import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.sql.results.graph.Fetch;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "saved_menu")
@Entity
public class Sm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smId;

    @ManyToOne()
    private Vip vip;

    @ManyToOne()
    private Menu menu;

    @Builder
    public Sm(Vip vip, Menu menu) {
        this.vip = vip;
        this.menu = menu;
    }
}
