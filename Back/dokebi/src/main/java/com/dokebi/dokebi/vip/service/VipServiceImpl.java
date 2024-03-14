package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VipServiceImpl implements VipService {

    private final VipRepository vipRepository;

    @Override
    public VipDto findVip(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        VipDto vipDto = VipDto.builder()
                .vipId(vip.getVipId())
                .vipNickName(vip.getVipNickName())
                .vipBirth(vip.getVipBirth())
                .vipProfile(vip.getVipProfile())
                .build();

        return vipDto;
    }

    @Override
    public int addVip(VipDto vipDto) {
        Optional<Vip> optVip = vipRepository.findByNickName(vipDto.getVipNickName());
        if(!optVip.isEmpty())
            throw new IllegalArgumentException("Already Existed NickName");

        Vip vip = Vip.builder()
                .vipId(vipDto.getVipId())
                .vipNickName(vipDto.getVipNickName())
                .vipBirth(vipDto.getVipBirth())
                .vipProfile(vipDto.getVipProfile())
                .build();

        Vip savedVip = vipRepository.save(vip);
        return savedVip.getVipId();
    }

    @Override
    public void removeVip(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));
        vipRepository.deleteById(vid);
    }


}
