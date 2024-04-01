package com.dokebi.dokebi.restaurant.controller;

import com.dokebi.dokebi.restaurant.dto.SavedRestaurantListResponseDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.service.SrService;
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
public class SrController {

    private final SrService srService;

    @Operation(summary = "선호 식당 목록 조회")
    @GetMapping("/api/sr/{vipId}")
    public ResponseEntity<?> srList(@PathVariable int vipId) {
        try {
            System.out.println("A");
            List<SavedRestaurantListResponseDto> srs = srService.findSr(vipId);

            return new ResponseEntity<List<SavedRestaurantListResponseDto>>(srs, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary = "선호 식당 저장")
    @PostMapping("/api/sr/{vipId}")
    public ResponseEntity<?> srAdd(@PathVariable int vipId, SavedRestaurantRequestDto sr) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("message", "success");
            srService.addSr(vipId, sr);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Operation(summary="선호 식당 삭제")
    @DeleteMapping("/api/sr/delete/{vipId}")
    public ResponseEntity<?> srRemove(@PathVariable int vipId, int srId) {
        Map<String, Object> resultMap = new HashMap<>();
        try {
            resultMap.put("message", "success");
            srService.removeSr(srId);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
