package com.dokebi.dokebi.vip.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Vip")
@Entity
public class Vip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vipId;
    private String vipNickName;
    private int vipBirth;
    private String vipProfile;

    @Builder
    public Vip(int vipId, String vipNickName, int vipBirth, String vipProfile) {
        this.vipNickName = vipNickName;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
    }
}
