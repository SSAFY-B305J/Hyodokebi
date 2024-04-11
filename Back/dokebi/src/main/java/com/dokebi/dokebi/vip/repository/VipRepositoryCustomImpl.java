package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.member.entity.QMember;
import com.dokebi.dokebi.music.entity.DisLikedMusic;
import com.dokebi.dokebi.music.entity.QDisLikedMusic;
import com.dokebi.dokebi.music.entity.QSavedMusic;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.vip.entity.QVip;
import com.dokebi.dokebi.vip.entity.Vip;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
public class VipRepositoryCustomImpl implements VipRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    @Transactional
    public Long modifyVip(Vip vip, int vid) {
        QVip qvip = QVip.vip;

        return queryFactory.update(qvip)
                .where(qvip.vipId.eq(vid))
                .set(qvip.vipNickname, vip.getVipNickname())
                .set(qvip.vipBirth, vip.getVipBirth())
                .set(qvip.vipProfile, vip.getVipProfile())
                .execute();
    }

    @Override
    public SavedMusic findVipMusic(int vid, int mid) {
        QSavedMusic qsavedmusic = QSavedMusic.savedMusic;

        return queryFactory.selectFrom(qsavedmusic)
                .where(qsavedmusic.vip.vipId.eq(vid)
                        .and(qsavedmusic.music.musicId.eq(mid)))
                .fetchOne();
    }

    @Override
    public DisLikedMusic findVipDisLikedMusics(int vid, int mid) {
        QDisLikedMusic qdislikedmusic = QDisLikedMusic.disLikedMusic;

        return queryFactory.selectFrom(qdislikedmusic)
                .where(qdislikedmusic.vip.vipId.eq(vid)
                        .and(qdislikedmusic.music.musicId.eq(mid)))
                .fetchOne();
    }

}
