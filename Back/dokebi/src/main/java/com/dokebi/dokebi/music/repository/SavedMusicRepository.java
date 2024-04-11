package com.dokebi.dokebi.music.repository;

import com.dokebi.dokebi.music.entity.SavedMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedMusicRepository extends JpaRepository<SavedMusic, Integer> {
}
