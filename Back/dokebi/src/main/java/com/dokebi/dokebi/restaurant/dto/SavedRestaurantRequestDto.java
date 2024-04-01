package com.dokebi.dokebi.restaurant.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SavedRestaurantRequestDto {

    private String restaurantName;
    private String restaurantAddress;
    private String restaurantNumber;
    private String restaurantUrl;
    private float restaurantLat;
    private float restaurantLong;
    private int menuId;

    @Builder
    public SavedRestaurantRequestDto(String restaurantName, String restaurantAddress, String restaurantNumber, String restaurantUrl, float restaurantLat, float restaurantLong, int menuId) {
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantNumber = restaurantNumber;
        this.restaurantUrl = restaurantUrl;
        this.restaurantLat = restaurantLat;
        this.restaurantLong = restaurantLong;
        this.menuId = menuId;
    }
}
