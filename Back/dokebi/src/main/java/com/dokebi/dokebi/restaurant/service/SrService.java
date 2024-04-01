package com.dokebi.dokebi.restaurant.service;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantListResponseDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.dokebi.dokebi.restaurant.entity.Sr;

import java.util.List;

public interface SrService {

    // 선호식당 조회
    List<SavedRestaurantListResponseDto> findSr(int vipId);

    // 선호식당 추가
    void addSr(int vipId, SavedRestaurantRequestDto sr);

    // 선호 식당 삭제
    void removeSr(int srId);
}
