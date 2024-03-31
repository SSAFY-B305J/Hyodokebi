package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.member.entity.Member;
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
    @Query("Select m From Member m Join Fetch m.vips v where m.memberIndex = :mIdx")
    Member findVipsOfMember(int mIdx);

    @Query("Select sm From SavedMusic sm Join Fetch sm.music Where sm.vip.vipId = :vid")
    List<SavedMusic> findVipMusics(int vid);

    @Query("Select dm From DisLikedMusic dm Join Fetch dm.music Where dm.vip.vipId = :vid")
    List<DisLikedMusic> findVipDisLikedMusics(int vid);


}
