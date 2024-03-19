package com.dokebi.dokebi.music.controller;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.service.MusicService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "추천된 음악 목록")
    @GetMapping("/api/music/res/{vid}")
    public ResponseEntity<?> musicList(@PathVariable int vid) {
        try {
            List<MusicDto>[] musicDtos = musicService.findMusics(vid);
            return new ResponseEntity<List<MusicDto>[]>(musicDtos, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @Operation(summary = "음악 저장")
    @PostMapping("/api/music/save/{mid}/{vid}")
    public ResponseEntity<?> musicAdd(@PathVariable int mid, @PathVariable int vid) {
        try {
            int res = musicService.addMusic(mid, vid);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "음악 싫어요")
    @PostMapping("/api/music/dislike/{mid}/{vid}")
    public ResponseEntity<?> musicAddDislike(@PathVariable int mid, @PathVariable int vid) {
        try {
            int res = musicService.addDislikeMusic(mid, vid);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "음악 싫어요 취소")
    @DeleteMapping("/api/music/dislike/{mid}/{vid}")
    public ResponseEntity<?> musicRemoveDislike(@PathVariable int mid, @PathVariable int vid) {
        try {
            musicService.removeDislikeMusic(mid, vid);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
