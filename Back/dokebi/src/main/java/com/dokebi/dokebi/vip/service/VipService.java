package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.vip.dto.VipDto;

import java.util.List;

public interface VipService {
    List<VipDto> findVipsOfMmeber(int mIdx);

    VipDto findVip(int vid);

    VipDto findVipAge(int vid);

    int addVip(VipDto vipDto, int mIdx);

    void removeVip(int vid);

    Long modifyVip(VipDto vipDto, int vid);

    List<MusicDto> findVipMusics(int vid);

    List<MusicDto> findVipDisLikedMusics(int vid);

    List<Integer> findVipMusicIds(int vid);

    List<Integer> findVipDisLikedMusicIds(int vid);

    Boolean findVipMusic(int vid, int mid);
}
