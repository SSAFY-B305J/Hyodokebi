package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.Music;

import java.util.List;

public interface MusicRepositoryCustom {

    long removeSaveMusic(int mid, int vid);

    long removeDisLikeMusic(int mid, int vid);
}
