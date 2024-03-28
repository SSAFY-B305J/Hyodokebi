package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.AgeGroup;
import com.dokebi.dokebi.music.dto.MusicDto;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;


public interface MusicService {
    MusicDto findMusic(int mid);

    int addMusic(int mid, int vid);

    int addDislikeMusic(int mid, int vid);

    long removeSavedMusic(int mid, int vid);

    long removeDislikeMusic(int mid, int vid);

    Map<AgeGroup, List<MusicDto>> findMusics(int vid) throws JsonProcessingException;

    void musictest();
}
