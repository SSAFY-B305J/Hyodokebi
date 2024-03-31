package com.dokebi.dokebi.music.service;

import com.dokebi.dokebi.music.dto.AgeGroup;
import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.dto.MusicTemplateDto;
import com.dokebi.dokebi.music.entity.DisLikedMusic;
import com.dokebi.dokebi.music.entity.Music;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.music.repository.DisLikedMusicRespository;
import com.dokebi.dokebi.music.repository.MusicRepository;
import com.dokebi.dokebi.music.repository.SavedMusicRepository;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import com.dokebi.dokebi.vip.service.VipService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final VipService vipService;
    private final VipRepository vipRepository;
    private final SavedMusicRepository savedMusicRepository;
    private final DisLikedMusicRespository disLikedMusicRespository;

    @Override
    public MusicDto findMusic(int mid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

        MusicDto musicDto = MusicDto.builder()
                .musicId(music.getMusicId())
                .musicYear(music.getMusicYear())
                .musicName(music.getMusicName())
                .musicSinger(music.getMusicSinger())
                .musicImg(music.getMusicImg())
                .musicLyrics(music.getMusicLyrics())
                .musicGenre(music.getMusicGenre())
                .musicComposer(music.getMusicComposer())
                .build();

        return musicDto;
    }

    @Override
    public Map<AgeGroup, List<MusicDto>> findMusics(int vid) throws JsonProcessingException {
        // RestAPI의 요청과 응답을 받을 수 있는 템플릿
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        // 플라스크 엔드포인트
        String flaskEndpoint = "http://127.0.0.1:5000/pyapi/music/res";

        // header를 json으로 받음
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Integer> vipSavedMusic = vipService.findVipMusicIds(vid);
        List<Integer> vipDisLikedMusics = vipService.findVipDisLikedMusicIds(vid);

        VipDto vipDto = vipService.findVipAge(vid); // vip 10대, 20대, 30대를 연도를 2차원 배열에 저장
        Map<AgeGroup, List<MusicDto>> recommendedMusicDtos = new EnumMap<>(AgeGroup.class); // EnumMap을 형성

        for (AgeGroup ageGroup : AgeGroup.values()) { // enum value 돌기

            // flask로 request 보낼 template
            MusicTemplateDto musicTemplateDto = MusicTemplateDto.builder()
                    .vipId(vid)
                    .vipSavedMusics(vipSavedMusic) // 이미 저장한 노래
                    .vipDisLikedMusics(vipDisLikedMusics) // 싫다고 한 노래
                    .ageGroup(vipDto.getVipAgeGroups()[ageGroup.ordinal()]) // enum index의 ageGroup
                    .build();

            // 요청을 보낼 httpEntity를 musicTemplateDto로 설정
            HttpEntity<MusicTemplateDto> httpEntity = new HttpEntity<>(musicTemplateDto, headers);

            // flask api로 post하고 응답을 받음
            String response = restTemplate.postForObject(flaskEndpoint, httpEntity, String.class);
            log.info("Flask Connection Success To -> Vip No.{}", httpEntity.getBody().getVipId());

            // 나이대에 맞는 음악이 없으면 빈 리스트 추가
            if(response.trim().equals("null")) {
                recommendedMusicDtos.put(ageGroup,new ArrayList<>());
                continue;
            }

            // 플라스크 api에서 객체로 보낸 응답을 jackson library의 objectMapper로 읽어옴
            // 단일 객체면 객체.class, 복수 객체면 typeReference로 지정해야 함
            // jsonprocessingexception 오류가 날 수 있음
            List<Music> recommendedMusics = objectMapper.readValue(response, new TypeReference<List<Music>>() {
            });

            // 응답을 musicDto로 변환해서 EnumMap에 삽입
            recommendedMusicDtos.put(ageGroup, recommendedMusics.stream().map(m -> MusicDto.builder()
                            .musicId(m.getMusicId())
                            .musicYear(m.getMusicYear())
                            .musicName(m.getMusicName())
                            .musicSinger(m.getMusicSinger())
                            .musicImg(m.getMusicImg())
                            .musicLyrics(m.getMusicLyrics())
                            .musicGenre(m.getMusicGenre())
                            .musicComposer(m.getMusicComposer())
                            .build())
                    .collect(Collectors.toList()));

        }

        return recommendedMusicDtos;
    }

    @Transactional
    @Override
    public int addMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        SavedMusic savedMusic = SavedMusic.builder()
                .music(music)
                .vip(vip)
                .build();

        // 이미 저장된 음악 예외 처리
        SavedMusic existedMusic = vipRepository.findVipMusic(vid, mid);
        if (existedMusic != null) return existedMusic.getSmId();

        savedMusicRepository.save(savedMusic);
        return savedMusic.getSmId();
    }

    @Transactional
    @Override
    public int addDislikeMusic(int mid, int vid) {
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));

        DisLikedMusic disLikedMusic = DisLikedMusic.builder()
                .music(music)
                .vip(vip)
                .build();

        // 이미 싫어요한 음악 예외 처리
        DisLikedMusic existedMusic = vipRepository.findVipDisLikedMusics(vid, mid);
        if (existedMusic != null) return existedMusic.getDmId();

        disLikedMusicRespository.save(disLikedMusic);
        return disLikedMusic.getDmId();
    }

    @Transactional
    @Override
    public long removeSavedMusic(int mid, int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

        return musicRepository.removeSaveMusic(mid, vid);

    }

    @Transactional
    @Override
    public long removeDislikeMusic(int mid, int vid) {
        Vip vip = vipRepository.findById(vid).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        Music music = musicRepository.findById(mid).orElseThrow(() -> new EntityNotFoundException("Music Entity Not Found"));

        return musicRepository.removeDisLikeMusic(mid, vid);
    }


}
