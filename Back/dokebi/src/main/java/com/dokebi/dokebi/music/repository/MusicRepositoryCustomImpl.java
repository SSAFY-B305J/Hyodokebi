package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.entity.QMusic;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class MusicRepositoryCustomImpl implements MusicRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Music> findMusics(int[] group, List<Music> savedMusics, List<Music> disLikedMusics) {
        QMusic qmusic = QMusic.music;

        return queryFactory.selectFrom(qmusic)
                .where(qmusic.notIn(savedMusics))
                .where(qmusic.notIn(disLikedMusics))
                .where(qmusic.musicYear.between(group[0], group[1]))
                .fetch();

    }
}
