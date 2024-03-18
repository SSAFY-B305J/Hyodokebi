package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.repository.MusicRepository;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.service.VipService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final VipService vipService;

    @Override
    public MusicDto findMusic(int mid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        MusicDto musicDto = MusicDto.builder()
                .musicId(music.getMusicId())
                .musicName(music.getMusicName())
                .musicSinger(music.getMusicSinger())
                .musicImg(music.getMusicImg())
                .musicLyrics(music.getMusicLyrics())
                .build();

        return musicDto;
    }

    @Override
    public List<MusicDto>[] findMusics(int vid) {
        VipDto vipDto = vipService.findVipAge(vid);

        List<MusicDto>[] selectedMusicDtos = new ArrayList[3];

        for(int i = 0; i < 3; i++){
            List<Music> musics = musicRepository.findMusics(vipDto.getVipAgeGroups()[i]);
            Collections.shuffle(musics);
            List<Music> selectedMusics = new ArrayList<>(musics.subList(0, 3));

            selectedMusicDtos[i] = selectedMusics.stream()
                    .map(m -> MusicDto.builder()
                            .musicId(m.getMusicId())
                            .musicName(m.getMusicName())
                            .musicSinger(m.getMusicSinger())
                            .musicImg(m.getMusicImg())
                            .musicLyrics(m.getMusicLyrics())
                            .build())
                    .collect(Collectors.toList());

        }

        return selectedMusicDtos;
    }


}
