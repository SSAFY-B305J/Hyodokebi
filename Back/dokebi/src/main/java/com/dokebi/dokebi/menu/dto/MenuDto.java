package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuDto {

    private int menuId;         // 메뉴 아이디
    private String menuName;    // 메뉴 이름
    private String cateId;      // 카테고리
    private String wtcId;       // 조리방법

    @Builder
    public MenuDto(int menuId, String menuName, String cateId, String wtcId) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.cateId = cateId;
        this.wtcId = wtcId;
    }
}
