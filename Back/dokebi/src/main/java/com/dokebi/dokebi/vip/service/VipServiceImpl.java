package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
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
                        .vipNickName(v.getVipNickName())
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
                .vipNickName(vip.getVipNickName())
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
                .vipNickName(vip.getVipNickName())
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
        Vip optVip = vipRepository.findByNickName(vipDto.getVipNickName()).orElseThrow(()-> new IllegalArgumentException("Already Existed NickName"));

        Vip vip = Vip.builder()
                .vipNickName(vipDto.getVipNickName())
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
                .vipNickName(vipDto.getVipNickName())
                .vipBirth(vipDto.getVipBirth())
                .vipProfile(vipDto.getVipProfile())
                .build();

        return vipRepository.modifyVip(vip, vid);
    }

    @Override
    public List<MusicDto> findVipMusics(int vid) {
        vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        List<Music> musics = vipRepository.findVipMusics(vid);

        List<MusicDto> musicDtos = musics.stream()
                .map(m -> MusicDto.builder()
                        .musicId(m.getMusicId())
                        .musicName(m.getMusicName())
                        .musicSinger(m.getMusicSinger())
                        .musicImg(m.getMusicImg())
                        .musicLyrics(m.getMusicLyrics())
                        .build())
                .collect(Collectors.toList());

        return musicDtos;
    }

    @Transactional
    @Override
    public void removeVipMusic(int mid, int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

        vip.getVipSavedMusics().remove(music);

    }


}
