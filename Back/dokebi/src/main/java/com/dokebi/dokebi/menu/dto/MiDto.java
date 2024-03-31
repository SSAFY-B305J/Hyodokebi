package com.dokebi.dokebi.menu.dto;

//Menu Ingredient

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MiDto {

    private int miId;
    private String miName;

    @Builder

    public MiDto(int miId, String miName) {
        this.miId = miId;
        this.miName = miName;
    }
}
