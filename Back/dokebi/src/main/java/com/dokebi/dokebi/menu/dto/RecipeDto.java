package com.dokebi.dokebi.menu.dto;


import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeDto {

    private int recipeId;
    private int menuId;
    private int miId;

    @Builder
    public RecipeDto(int recipeId, int menuId, int miId) {
        this.recipeId = recipeId;
        this.menuId = menuId;
        this.miId = miId;
    }
}
