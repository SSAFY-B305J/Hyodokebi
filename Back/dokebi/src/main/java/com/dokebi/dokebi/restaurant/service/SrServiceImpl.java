package com.dokebi.dokebi.restaurant.service;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantListResponseDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.Sr;
import com.dokebi.dokebi.restaurant.repository.SrRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class SrServiceImpl implements SrService{

    private final SrRepository srRepository;

    @Override
    public List<SavedRestaurantListResponseDto> findSr(int vipId) {
        return srRepository.findSrByVipId(vipId);
    }

    @Override
    public void addSr(int vipId, SavedRestaurantRequestDto sr) {
        srRepository.addSavedRestaurant(vipId, sr);
    }

    @Override
    public void removeSr(int srId) {
        srRepository.deleteById(srId);
    }
}
