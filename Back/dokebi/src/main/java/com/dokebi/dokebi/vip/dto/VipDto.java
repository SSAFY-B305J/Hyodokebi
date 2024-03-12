package com.dokebi.dokebi.vip.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VipDto {

    private int vipId;
    private String vipNickName;
    private int vipBirth;
    private String vipProfile;
}
