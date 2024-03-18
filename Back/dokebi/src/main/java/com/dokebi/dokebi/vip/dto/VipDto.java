package com.dokebi.dokebi.vip.dto;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
