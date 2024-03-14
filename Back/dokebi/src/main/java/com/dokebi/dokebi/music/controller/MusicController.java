package com.dokebi.dokebi.music.controller;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.service.MusicService;
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

    @GetMapping("/api/music/{mid}")
    public ResponseEntity<?> MusicDetails(@PathVariable int mid) {
        try {
            MusicDto musicDto = musicService.findMusic(mid);
            return new ResponseEntity<MusicDto>(musicDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
