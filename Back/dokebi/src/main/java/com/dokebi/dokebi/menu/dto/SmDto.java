package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SmDto {

    private int smId;
    private int vipId;
    private int menuId;

    @Builder
    public SmDto(int smId, int vipId, int menuId) {
        this.smId = smId;
        this.vipId = vipId;
        this.menuId = menuId;
    }
}
