package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.DisLikedMusic;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.music.repository.MusicRepository;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VipServiceImpl implements VipService {

    private final VipRepository vipRepository;
    private final MusicRepository musicRepository;

    @Override
    public List<VipDto> findVips() {
        List<Vip> vips = vipRepository.findAll();

        List<VipDto> vipDtos = vips.stream()
                .map(v -> VipDto.builder()
                        .vipId(v.getVipId())
                        .vipNickname(v.getVipNickname())
                        .vipBirth(v.getVipBirth())
                        .vipProfile(v.getVipProfile())
                        .build())
                .collect(Collectors.toList());

        return vipDtos;
    }

    @Override
    public VipDto findVip(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        VipDto vipDto = VipDto.builder()
                .vipId(vip.getVipId())
                .vipNickname(vip.getVipNickname())
                .vipBirth(vip.getVipBirth())
                .vipProfile(vip.getVipProfile())
                .build();

        return vipDto;
    }

    @Override
    public VipDto findVipAge(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        VipDto vipDto = VipDto.builder()
                .vipId(vip.getVipId())
                .vipNickname(vip.getVipNickname())
                .vipBirth(vip.getVipBirth())
                .vipProfile(vip.getVipProfile())
                .vipAgeGroups(new int[][]{{vip.getVipBirth() + 9, vip.getVipBirth() + 18},
                        {vip.getVipBirth() + 19, vip.getVipBirth() + 28},
                        {vip.getVipBirth() + 29, vip.getVipBirth() + 38}})
                .build();

        return vipDto;
    }

    @Transactional
    @Override
    public int addVip(VipDto vipDto) {
        Vip vip = Vip.builder()
                .vipNickname(vipDto.getVipNickname())
                .vipBirth(vipDto.getVipBirth())
                .vipProfile(vipDto.getVipProfile())
                .build();

        Vip savedVip = vipRepository.save(vip);
        return savedVip.getVipId();
    }

    @Override
    public void removeVip(int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        vipRepository.deleteById(vid);
    }

    @Transactional
    @Override
    public Long modifyVip(VipDto vipDto, int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        Vip vip = Vip.builder()
                .vipNickname(vipDto.getVipNickname())
                .vipBirth(vipDto.getVipBirth())
                .vipProfile(vipDto.getVipProfile())
                .build();

        return vipRepository.modifyVip(vip, vid);
    }

    @Override
    public List<MusicDto> findVipMusics(int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        List<SavedMusic> musics = vipRepository.findVipMusics(vid);

        List<MusicDto> musicDtos = musics.stream()
                .map(m -> MusicDto.builder()
                        .musicId(m.getMusic().getMusicId())
                        .musicYear(m.getMusic().getMusicYear())
                        .musicName(m.getMusic().getMusicName())
                        .musicSinger(m.getMusic().getMusicSinger())
                        .musicImg(m.getMusic().getMusicImg())
                        .musicLyrics(m.getMusic().getMusicLyrics())
                        .build())
                .collect(Collectors.toList());

        return musicDtos;
    }

    @Override
    public List<MusicDto> findVipDisLikedMusics(int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        List<DisLikedMusic> musics = vipRepository.findVipDisLikedMusics(vid);

        List<MusicDto> musicDtos = musics.stream()
                .map(m -> MusicDto.builder()
                        .musicId(m.getMusic().getMusicId())
                        .musicYear(m.getMusic().getMusicYear())
                        .musicName(m.getMusic().getMusicName())
                        .musicSinger(m.getMusic().getMusicSinger())
                        .musicImg(m.getMusic().getMusicImg())
                        .musicLyrics(m.getMusic().getMusicLyrics())
                        .build())
                .collect(Collectors.toList());

        return musicDtos;
    }

    @Override
    public List<Integer> findVipMusicIds(int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        List<SavedMusic> musics = vipRepository.findVipMusics(vid);

        List<Integer> musicIds = musics.stream()
                .map(m -> m.getMusic().getMusicId())
                .collect(Collectors.toList());

        return musicIds;
    }

    @Override
    public List<Integer> findVipDisLikedMusicIds(int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        List<DisLikedMusic> musics = vipRepository.findVipDisLikedMusics(vid);

        List<Integer> musicIds = musics.stream()
                .map(m -> m.getMusic().getMusicId())
                .collect(Collectors.toList());

        return musicIds;
    }


}
