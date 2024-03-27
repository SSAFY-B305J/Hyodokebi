package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.music.entity.DisLikedMusic;
import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.vip.entity.Vip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VipRepository extends JpaRepository<Vip, Integer>, VipRepositoryCustom {

    @Query("Select v.vipSavedMusics From Vip v Where v.vipId = :vid")
    List<SavedMusic> findVipMusics(int vid);

    @Query("Select v.vipDisLikedMusics From Vip v Where v.vipId = :vid")
    List<DisLikedMusic> findVipDisLikedMusics(int vid);
}
