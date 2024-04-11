package com.dokebi.dokebi.vip.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VipDto {

    private int vipId;

    private String vipNickname;

    private int vipBirth;

    private int vipProfile;

    private int[][] vipAgeGroups;

    @Builder
    public VipDto(int vipId, String vipNickname, int vipBirth, int vipProfile, int[][] vipAgeGroups) {
        this.vipId = vipId;
        this.vipNickname = vipNickname;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
        this.vipAgeGroups = vipAgeGroups;
    }
}
