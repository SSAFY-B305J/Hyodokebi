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
    public MusicDto findMusic(int mid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException());

        MusicDto musicDto = MusicDto.builder()
                .musicId(music.getMusicId())
                .musicName(music.getMusicName())
                .musicSinger(music.getMusicSinger())
//                .musicYear(music.getMusicYear())
                .musicImg(music.getMusicImg())
                .musicLyrics(music.getMusicLyrics())
//                .musicComposer(music.getMusicComposer())
//                .musicGenre(music.getMusicGenre())
                .build();

        return musicDto;
    }
    


}
