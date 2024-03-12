package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;


public interface MusicService {
    MusicDto findByMusicId(int mid) throws EntityNotFoundException;

}
