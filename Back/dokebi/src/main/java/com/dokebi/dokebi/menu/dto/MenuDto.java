package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuDto {

    private int menuId;         // 메뉴 아이디
    private String menuName;    // 메뉴 이름
    private String cateImage;      // 카테고리

    @Builder
    public MenuDto(int menuId, String menuName, String cateImage) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.cateImage = cateImage;
    }
}
