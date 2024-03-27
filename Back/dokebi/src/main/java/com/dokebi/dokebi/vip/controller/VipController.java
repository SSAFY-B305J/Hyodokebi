package com.dokebi.dokebi.vip.controller;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.service.VipService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class VipController {

    private final VipService vipService;

    @Operation(summary = "VIP 목록")
    @GetMapping("/api/vip")
    public ResponseEntity<?> vipList() {
        try {
            List<VipDto> vipDtos = vipService.findVips();
            return new ResponseEntity<List<VipDto>>(vipDtos, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 상세")
    @GetMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipDetails(@PathVariable int vid) {
        try {
            VipDto vipDto = vipService.findVip(vid);
            return new ResponseEntity<VipDto>(vipDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 추가")
    @PostMapping("/api/vip")
    public ResponseEntity<?> vipAdd(@RequestBody VipDto vipDto) {
        try {
            int res = vipService.addVip(vipDto);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 삭제")
    @DeleteMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipRemove(@PathVariable int vid) {
        try {
            vipService.removeVip(vid);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 수정")
    @PutMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipModify(@RequestBody VipDto vipDto, @PathVariable int vid) {
        try {
            Long res = vipService.modifyVip(vipDto, vid);
            return new ResponseEntity<Long>(res, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP가 저장한 음악")
    @GetMapping("/api/vip/music/{vid}")
    public ResponseEntity<?> vipDetailMusics(@PathVariable int vid) {
        try {
            List<MusicDto> musicDtos = vipService.findVipMusics(vid);
            return new ResponseEntity<List<MusicDto>>(musicDtos, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP가 싫어요한 음악")
    @GetMapping("/api/vip/music/dislike/{vid}")
    public ResponseEntity<?> vipDetailDisLikedMusics(@PathVariable int vid) {
        try {
            List<MusicDto> musicDtos = vipService.findVipDisLikedMusics(vid);
            return new ResponseEntity<List<MusicDto>>(musicDtos, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
