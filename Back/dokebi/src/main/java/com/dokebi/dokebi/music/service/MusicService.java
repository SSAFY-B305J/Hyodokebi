package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MusicService {
    MusicDto findMusic(int mid);
    List<MusicDto>[] findMusics(int vid);
}
