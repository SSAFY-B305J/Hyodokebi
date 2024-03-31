package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WcMenuDto {

    private int menuId;
    private String menuImg;

    @Builder
    public WcMenuDto(int menuId, String menuImg) {
        this.menuId = menuId;
        this.menuImg = menuImg;
    }
}
