package com.dokebi.dokebi.vip.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VipDto {

    private int vipId;
    private String vipNickName;
    private int vipBirth;
    private String vipProfile;
    private int[][] vipAgeGroups;

    @Builder
    public VipDto(int vipId, String vipNickName, int vipBirth, String vipProfile, int[][] vipAgeGroups) {
        this.vipId = vipId;
        this.vipNickName = vipNickName;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
        this.vipAgeGroups = vipAgeGroups;
    }
}
