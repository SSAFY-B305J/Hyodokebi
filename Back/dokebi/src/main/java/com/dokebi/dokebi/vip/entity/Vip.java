package com.dokebi.dokebi.vip.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.util.Assert;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Vip")
@Entity
public class Vip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vipId;
    @Column(nullable = false)
    private String vipNickName;
    @Column(nullable = false)
    private int vipBirth;
    @Column(nullable = false)
    private String vipProfile;

    @Builder
    public Vip(String vipNickName, int vipBirth, String vipProfile) {
        this.vipNickName = vipNickName;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
    }

}
