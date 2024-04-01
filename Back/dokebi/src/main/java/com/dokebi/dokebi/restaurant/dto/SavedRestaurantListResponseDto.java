package com.dokebi.dokebi.restaurant.dto;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SavedRestaurantListResponseDto {

    private int restaurantId;
    private String restaurantName;
    private String restaurantAddress;
    private String restaurantUrl;
    private String cateImage;

    @Builder
    public SavedRestaurantListResponseDto(int restaurantId, String restaurantName, String restaurantAddress, String restaurantUrl, String cateImage) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantUrl = restaurantUrl;
        this.cateImage = cateImage;
    }
}
