package com.dokebi.dokebi.vip.controller;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.service.VipService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class VipController {

    private final VipService vipService;

    @GetMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipDetails(@PathVariable int vid){
        try {
            VipDto vipDto = vipService.findVip(vid);
            return new ResponseEntity<VipDto>(vipDto, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/api/vip")
    public ResponseEntity<?> vipAdd(@RequestBody VipDto vipDto){
        try {
            int res = vipService.addVip(vipDto);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/api/vip/{vid}")
    public ResponseEntity<?> vipRemove(@PathVariable int vid){
        try {
            vipService.removeVip(vid);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
