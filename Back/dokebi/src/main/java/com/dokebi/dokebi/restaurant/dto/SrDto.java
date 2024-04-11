package com.dokebi.dokebi.restaurant.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SrDto {

    private int srId;
    private int vipId;
    private int restaurantId;

    @Builder
    public SrDto(int srId, int vipId, int restaurantId) {
        this.srId = srId;
        this.vipId = vipId;
        this.restaurantId = restaurantId;
    }
}
