package com.dokebi.dokebi.vip.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
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


}
