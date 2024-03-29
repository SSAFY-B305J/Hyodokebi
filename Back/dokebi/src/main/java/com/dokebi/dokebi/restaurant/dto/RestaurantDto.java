package com.dokebi.dokebi.restaurant.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantDto {

    private int restaurantId;
    private String restaurantName;
    private String restaurantAddress;
    private String restaurantNumber;
    private String restaurantUrl;
    private float restaurantLat;
    private float restaurantLong;
    private int menuId;

    @Builder
    public RestaurantDto(int restaurantId, String restaurantName, String restaurantAddress, String restaurantNumber, String restaurantUrl, float restaurantLat, float restaurantLong, int menuId) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantNumber = restaurantNumber;
        this.restaurantUrl = restaurantUrl;
        this.restaurantLat = restaurantLat;
        this.restaurantLong = restaurantLong;
        this.menuId = menuId;
    }
}
