package com.dokebi.dokebi.restaurant.service;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.dokebi.dokebi.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class RestaurantServiceImpl implements RestaurantService{

    private final RestaurantRepository restaurantRepository;


    @Override
    public Restaurant findRestaurant(float restaurantLat, float restaurantLong) {
        return restaurantRepository.findRestaurantByLatLong(restaurantLat, restaurantLong);
    }

    @Override
    public Restaurant addRestaurant(Restaurant res) {
        return restaurantRepository.save(res);
    }

    @Override
    public Long modifyRestaurant(Restaurant res) {
        return restaurantRepository.modifyRestaurant(res);
    }

}
