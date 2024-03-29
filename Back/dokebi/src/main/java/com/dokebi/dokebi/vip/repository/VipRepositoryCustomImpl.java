package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.music.entity.QMusic;
import com.dokebi.dokebi.music.entity.QSavedMusic;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.vip.entity.QVip;
import com.dokebi.dokebi.vip.entity.Vip;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
public class VipRepositoryCustomImpl implements VipRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override    @Transactional
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
    public SavedMusic findVipMusic(int vipId, int musicId) {
        QSavedMusic qSavedMusic = QSavedMusic.savedMusic;

        return queryFactory.selectFrom(qSavedMusic)
                .where(qSavedMusic.vip.vipId.eq(vipId)
                        .and(qSavedMusic.music.musicId.eq(musicId)))
                .fetchOne();
    }

}
