package com.dokebi.dokebi.menu.controller;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import com.dokebi.dokebi.menu.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MenuControlloer {

    private final MenuService menuService;

    @Operation(summary = "월그컵 메뉴 목록")
    @GetMapping("/api/wc")
    public ResponseEntity<?> menuList(){
        try{
            List<MenuDto> menuList = menuService.findMenu();
            return new ResponseEntity<List<MenuDto>>(menuList, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "선호 메뉴 목록")
    @GetMapping("/api/vip/sm/{vipId}")
    public ResponseEntity<?> smList(@PathVariable int vipId){
        try{
            List<MenuDto> smList = menuService.findSavedMenu(vipId);
            return new ResponseEntity<List<MenuDto>>(smList, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "선호 메뉴 추가")
    @PostMapping("/api/vip/sm/{vipId}")
    public ResponseEntity<?> smAdd(@PathVariable int vipId, @RequestBody List<Integer> menuIds){
        try{
            int res = menuService.addSavedMenu(vipId, menuIds);
            return new ResponseEntity<Integer>(res, HttpStatus.OK);
        }catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
