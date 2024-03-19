package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.dto.AgeGroup;
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

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final VipService vipService;
    private final VipRepository vipRepository;

    @Override
    public MusicDto findMusic(int mid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

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
    public Map<AgeGroup, List<MusicDto>> findMusics(int vid) {
        VipDto vipDto = vipService.findVipAge(vid);
        List<Music> savedMusics = vipRepository.findVipMusics(vid);
        List<Music> disLikedMusics = vipRepository.findVipDisLikedMusics(vid);

        Map<AgeGroup, List<MusicDto>> selectedMusicDtos = new EnumMap<>(AgeGroup.class);

        for (AgeGroup ageGroup : AgeGroup.values()) { // enum 돌면서
            int ageGroupInx = ageGroup.ordinal(); // enum 인덱스 반환
            List<Music> musics = musicRepository.findMusics(vipDto.getVipAgeGroups()[ageGroupInx], savedMusics, disLikedMusics);

            Collections.shuffle(musics);
            List<Music> selectedMusics = new ArrayList<>(musics.subList(0, Math.min(musics.size(), 9)));

            selectedMusicDtos.put(ageGroup, selectedMusics.stream()
                    .map(m -> MusicDto.builder()
                            .musicId(m.getMusicId())
                            .musicName(m.getMusicName())
                            .musicSinger(m.getMusicSinger())
                            .musicImg(m.getMusicImg())
                            .musicLyrics(m.getMusicLyrics())
                            .build())
                    .collect(Collectors.toList()));
        }

        return selectedMusicDtos;
    }


    @Transactional
    @Override
    public int addMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        vip.getVipSavedMusics().add(music);

        return vip.getVipSavedMusics().size();
    }

    @Transactional
    @Override
    public int addDislikeMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        vip.getVipDisLikedMusics().add(music);

        return vip.getVipDisLikedMusics().size();
    }

    @Transactional
    @Override
    public void removeDislikeMusic(int mid, int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

        vip.getVipDisLikedMusics().remove(music);
    }


}
