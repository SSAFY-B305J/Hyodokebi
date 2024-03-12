package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class VipServiceImpl implements VipService {

    private final VipRepository vipRepository;
    @Override
    public VipDto findByVipId(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException());

        VipDto vipDto = VipDto.builder()
                .vipId(vip.getVipId())
                .vipNickName(vip.getVipNickName())
                .vipBirth(vip.getVipBirth())
                .vipProfile(vip.getVipProfile())
                .build();

        return vipDto;
    }
}
