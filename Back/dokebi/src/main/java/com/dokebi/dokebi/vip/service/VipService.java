package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public interface VipService {
    List<VipDto> findVips();
    VipDto findVip(int vid);
    VipDto findVipAge(int vid);
    int addVip(VipDto vipDto);
    void removeVip(int vid);
    Long modifyVip(VipDto vipDto, int vid);
    List<MusicDto> findVipMusics(int vid);
}
