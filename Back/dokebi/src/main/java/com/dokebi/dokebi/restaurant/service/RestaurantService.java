package com.dokebi.dokebi.restaurant.service;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface RestaurantService {

    // 식당 조회
    Restaurant findRestaurant(float restaurantLat, float restaurantLong);

    // 식당 추가
    Restaurant addRestaurant(Restaurant res);

    // 식당 정보 수정
    Long modifyRestaurant(Restaurant res);


}
