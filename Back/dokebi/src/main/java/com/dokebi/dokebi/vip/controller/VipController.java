package com.dokebi.dokebi.vip.controller;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.service.VipService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class VipController {

    private final VipService vipService;

    @GetMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipDetails(@PathVariable int vid){
        try {
            VipDto vipDto = vipService.findByVipId(vid);
            return new ResponseEntity<VipDto>(vipDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
