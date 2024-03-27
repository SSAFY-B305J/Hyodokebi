package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;

import java.util.List;
import java.util.Optional;

public interface VipService {
    List<VipDto> findVips();

    VipDto findVip(int vid);

    VipDto findVipAge(int vid);

    int addVip(VipDto vipDto);

    void removeVip(int vid);

    Long modifyVip(VipDto vipDto, int vid);

    List<MusicDto> findVipMusics(int vid);

    List<MusicDto> findVipDisLikedMusics(int vid);

    List<Integer> findVipMusicIds(int vid);

    List<Integer> findVipDisLikedMusicIds(int vid);


}
