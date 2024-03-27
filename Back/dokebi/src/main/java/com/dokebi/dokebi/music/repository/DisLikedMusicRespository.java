package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.DisLikedMusic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisLikedMusicRespository extends JpaRepository<DisLikedMusic, Integer> {
}
