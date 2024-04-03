package com.dokebi.dokebi.menu.service;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface MenuService {

    // 메뉴 리스트 조회
    List<MenuDto> findMenu();

    // 선호 메뉴 리스트 조회
    List<MenuDto> findSavedMenu(int vipId);

    // 선호 메뉴 추가
    int addSavedMenu(int vipId, List<Integer> menuIds);

    String startTrain();

    // 메뉴 추천
    List<MenuDto> recommendedMenus(int vipId, List<Integer> menuIds) throws JsonProcessingException;

}
