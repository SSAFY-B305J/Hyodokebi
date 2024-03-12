package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.repository.MusicRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;

    @Override
    public MusicDto findByMusicId(int mid) throws EntityNotFoundException {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException());

        MusicDto musicDto = MusicDto.builder()
                .musicId(music.getMusicId())
                .musicName(music.getMusicName())
                .musicSinger(music.getMusicSinger())
                .musicYear(music.getMusicYear())
                .musicImg(music.getMusicImg())
                .musicLyrics(music.getMusicLyrics())
                .build();

        return musicDto;
    }


}
