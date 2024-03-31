package com.dokebi.dokebi.menu.service;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;

import java.util.List;

public interface MenuService {

    // 메뉴 리스트 조회
    List<MenuDto> findMenu();

    // 선호 메뉴 리스트 조회
    List<MenuDto> findSavedMenu(int vipId);

    // 선호 메뉴 추가
    int addSavedMenu(int vipId, List<Integer> menuIds);


//    // 선호 메뉴 수정 ( 취소 )
//    void updateSavedMenu(int smId);


}
