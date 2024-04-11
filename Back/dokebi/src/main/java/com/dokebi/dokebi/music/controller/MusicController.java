package com.dokebi.dokebi.music.controller;

import com.dokebi.dokebi.music.dto.AgeGroup;
import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.service.MusicService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class MusicController {

    private final MusicService musicService;

    @Operation(summary = "음악 상세 정보")
    @GetMapping("/api/music/{mid}")
    public ResponseEntity<?> musicDetails(@PathVariable int mid) {
        try {
            MusicDto musicDto = musicService.findMusic(mid);
            return new ResponseEntity<MusicDto>(musicDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @Operation(summary = "음악 저장")
    @PostMapping("/api/music/save/{mid}/{vid}")
    public ResponseEntity<?> musicAdd(@PathVariable int mid, @PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            int res = musicService.addMusic(mid, vid);
            resultMap.put("message", res);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "음악 저장 취소")
    @DeleteMapping("/api/music/save/{mid}/{vid}")
    public ResponseEntity<?> musicRemoveSave(@PathVariable int mid, @PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            long res = musicService.removeSavedMusic(mid, vid);
            resultMap.put("message", res);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "음악 싫어요")
    @PostMapping("/api/music/dislike/{mid}/{vid}")
    public ResponseEntity<?> musicAddDislike(@PathVariable int mid, @PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            long res = musicService.addDislikeMusic(mid, vid);
            resultMap.put("message", res);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "음악 싫어요 취소")
    @DeleteMapping("/api/music/dislike/{mid}/{vid}")
    public ResponseEntity<?> musicRemoveDislike(@PathVariable int mid, @PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            long res = musicService.removeDislikeMusic(mid, vid);
            resultMap.put("message", res);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "추천된 음악 목록")
    @GetMapping("/api/music/res/{vid}")
    public ResponseEntity<?> recommendedMusicDetails(@PathVariable int vid) {
        try {
            Map<AgeGroup, List<MusicDto>> recommendedMusicDtos = musicService.findMusics(vid);
            return new ResponseEntity<Map<AgeGroup, List<MusicDto>>>(recommendedMusicDtos, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }


    }


}





