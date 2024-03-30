package com.dokebi.dokebi.vip.controller;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.service.VipService;
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
public class VipController {

    private final VipService vipService;

    @Operation(summary = "Member의 VIP 목록")
    @GetMapping("/api/myvip/{mIdx}")
    public ResponseEntity<?> vipList(@PathVariable int mIdx) {
        try {
            List<VipDto> vipDtos = vipService.findVipsOfMmeber(mIdx);
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
    @PostMapping("/api/vip/{mIdx}")
    public ResponseEntity<?> vipAdd(@RequestBody VipDto vipDto, @PathVariable int mIdx) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            int res = vipService.addVip(vipDto, mIdx);
            resultMap.put("message", res);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 삭제")
    @DeleteMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipRemove(@PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("message", "success");
            vipService.removeVip(vid);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "VIP 수정")
    @PutMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipModify(@RequestBody VipDto vipDto, @PathVariable int vid) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Long res = vipService.modifyVip(vipDto, vid);
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

    @Operation(summary = "VIP가 저장한 음악 여부")
    @GetMapping("/api/vip/music/{vid}/{mid}")
    public ResponseEntity<?> vipDetailMusics(@PathVariable int vid, @PathVariable int mid) {
        try {
            Boolean res = vipService.findVipMusic(vid, mid);
            return new ResponseEntity<Boolean>(res, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
