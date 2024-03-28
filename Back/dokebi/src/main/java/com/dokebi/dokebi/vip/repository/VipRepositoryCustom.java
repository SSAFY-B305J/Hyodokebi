package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.vip.entity.Vip;

import java.util.Optional;

public interface VipRepositoryCustom {
    Long modifyVip(Vip vip, int vid);

    SavedMusic findVipMusic(int vid, int mid);
}
