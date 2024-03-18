package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VipServiceImpl implements VipService {

    private final VipRepository vipRepository;

    @Override
    public List<VipDto> findVips() {
        List<Vip> vips = vipRepository.findAll();

//        이렇게 하면 각 VIP마다 DB를 조회함
//        List<VipDto> vipDtos = vips.stream()
//                .map(v -> findVip(v.getVipId()))
//                .collect(Collectors.toList());

        List<VipDto> vipDtos = vips.stream()
                .map(v -> VipDto.builder()
                        .vipId(v.getVipId())
                        .vipNickName(v.getVipNickName())
                        .vipBirth(v.getVipBirth())
                        .vipProfile(v.getVipProfile())
                        .build())
                .collect(Collectors.toList());

        return vipDtos;
    }

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
    public VipDto findVipAge(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        VipDto vipDto = VipDto.builder()
                .vipId(vip.getVipId())
                .vipNickName(vip.getVipNickName())
                .vipBirth(vip.getVipBirth())
                .vipProfile(vip.getVipProfile())
                .vipAgeGroups(new int[][]{{vip.getVipBirth() + 9, vip.getVipBirth() + 18},
                        {vip.getVipBirth() + 19, vip.getVipBirth() + 28},
                        {vip.getVipBirth() + 29, vip.getVipBirth() + 38}})
                .build();

        return vipDto;
    }

    @Override
    public int addVip(VipDto vipDto) {
        Optional<Vip> optVip = vipRepository.findByNickName(vipDto.getVipNickName());
        if (!optVip.isEmpty())
            throw new IllegalArgumentException("Already Existed NickName");

        Vip vip = Vip.builder()
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

    @Override
    public Long modifyVip(VipDto vipDto, int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        Vip vip = Vip.builder()
                .vipNickName(vipDto.getVipNickName())
                .vipBirth(vipDto.getVipBirth())
                .vipProfile(vipDto.getVipProfile())
                .build();

        return vipRepository.modifyVip(vip, vid);
    }


}
