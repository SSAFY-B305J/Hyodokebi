package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantListResponseDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Sr;

import java.util.List;

public interface SrRepositoryCustom {

    List<SavedRestaurantListResponseDto> findSrByVipId(int vipId);

    void addSavedRestaurant(int vipId, SavedRestaurantRequestDto sr);

}
