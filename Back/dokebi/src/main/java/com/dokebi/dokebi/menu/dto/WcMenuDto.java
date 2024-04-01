package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WcMenuDto {

    private int menuId;
    private String menuName;
    private String menuImg;

    @Builder
    public WcMenuDto(int menuId, String menuName, String menuImg) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.menuImg = menuImg;
    }
}
