package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.entity.QDisLikedMusic;
import com.dokebi.dokebi.music.entity.QMusic;
import com.dokebi.dokebi.music.entity.QSavedMusic;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MusicRepositoryCustomImpl implements MusicRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public long removeSaveMusic(int mid, int vid) {
        QSavedMusic qSavedMusic = QSavedMusic.savedMusic;

        return queryFactory.delete(qSavedMusic)
                .where(qSavedMusic.music.musicId.eq(mid)
                        .and(qSavedMusic.vip.vipId.eq(vid)))
                .execute();
    }

    @Override
    public long removeDisLikeMusic(int mid, int vid) {
        QDisLikedMusic qDisLikedMusic = QDisLikedMusic.disLikedMusic;

        return queryFactory.delete(qDisLikedMusic)
                .where(qDisLikedMusic.music.musicId.eq(mid)
                        .and(qDisLikedMusic.vip.vipId.eq(vid)))
                .execute();
    }
}
