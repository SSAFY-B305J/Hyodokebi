package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.Music;

import java.util.List;

public interface MusicRepositoryCustom {

    List<Music> findMusics(int[] group, List<Music> savedMusics, List<Music> disLikedMusics);

    long removeSaveMusic(int mid, int vid);

    long removeDisLikeMusic(int mid, int vid);
}
