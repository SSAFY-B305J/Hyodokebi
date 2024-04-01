package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.restaurant.entity.QRestaurant;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.dokebi.dokebi.vip.entity.QVip;
import com.dokebi.dokebi.vip.entity.Vip;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
public class RestaurantRepositoryCustomImpl implements RestaurantRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional
    public Long modifyRestaurant(Restaurant res) {
        QRestaurant qRestaurant = QRestaurant.restaurant;

        return queryFactory.update(qRestaurant)
                .where(qRestaurant.restaurantId.eq(res.getRestaurantId()))
                .set(qRestaurant.restaurantAddress, res.getRestaurantAddress())
                .set(qRestaurant.restaurantLat, res.getRestaurantLat())
                .set(qRestaurant.restaurantLong, res.getRestaurantLong())
                .set(qRestaurant.restaurantNumber, res.getRestaurantNumber())
                .set(qRestaurant.restaurantUrl, res.getRestaurantUrl())
                .set(qRestaurant.menu, res.getMenu())
                .execute();

    }
}
