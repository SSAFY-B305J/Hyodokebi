package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>, RestaurantRepositoryCustom {

    @Query("SELECT res FROM Restaurant res WHERE res.restaurantLat = :restaurantLat and res.restaurantLong = :restaurantLong")
    Restaurant findRestaurantByLatLong(float restaurantLat, float restaurantLong);

}
