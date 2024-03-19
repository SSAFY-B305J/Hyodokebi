package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.repository.MusicRepository;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import com.dokebi.dokebi.vip.service.VipService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final VipService vipService;
    private final VipRepository vipRepository;

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
        List<Music> savedMusics = vipRepository.findVipMusics(vid);
        List<Music> disLikedMusics = vipRepository.findVipDisLikedMusics(vid);

        List<MusicDto>[] selectedMusicDtos = new ArrayList[3];

        for (int i = 0; i < 3; i++) {
            List<Music> musics = musicRepository.findMusics(vipDto.getVipAgeGroups()[i], savedMusics, disLikedMusics);
            if (musics == null) throw new IllegalArgumentException("Recommendation Fail");

            Collections.shuffle(musics);
            List<Music> selectedMusics = new ArrayList<>(musics.subList(0, 9));

            selectedMusicDtos[i] = musics.stream()
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

    @Transactional
    @Override
    public int addMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        vip.getVipSavedMusics().add(music);

        return vip.getVipSavedMusics().size();
    }

    @Transactional
    @Override
    public int addDislikeMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Entity Not Found"));

        vip.getVipDisLikedMusics().add(music);

        return vip.getVipDisLikedMusics().size();
    }


}
