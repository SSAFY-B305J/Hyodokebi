package com.dokebi.dokebi.music.repository;


import com.dokebi.dokebi.music.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Integer> {
}
