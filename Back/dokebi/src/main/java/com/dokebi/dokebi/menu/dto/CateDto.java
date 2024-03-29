package com.dokebi.dokebi.menu.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CateDto {

    private int cateId;
    private String cateImage;
    private String cateName;

    @Builder
    public CateDto(int cateId, String cateImage, String cateName) {
        this.cateId = cateId;
        this.cateImage = cateImage;
        this.cateName = cateName;
    }
}
