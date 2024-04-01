package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.querydsl.jpa.impl.JPAUpdateClause;

public interface RestaurantRepositoryCustom {

    Long modifyRestaurant(Restaurant res);
}
