package com.dokebi.dokebi.menu.service;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import com.dokebi.dokebi.menu.entity.Sm;
import com.dokebi.dokebi.menu.repository.MenuRepository;
import com.dokebi.dokebi.menu.repository.SmRepository;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final SmRepository smRepository;
    private final VipRepository vipRepository;

    @Override
    public List<MenuDto> findMenu() {
        return menuRepository.findMenu();
    }

    @Override
    public List<MenuDto> findSavedMenu(int vipId) {

        return menuRepository.findSavedMenu(vipId);
    }

    @Override
    public int addSavedMenu(int vipId, List<Integer> menuIds) {

        Vip vip = vipRepository.findById(vipId).orElseThrow(() -> new EntityNotFoundException("Vip Entity Not Found"));
        int result = 0;

        for(int i = 0 ; i < menuIds.size(); i++){
            Menu menu = menuRepository.findById(menuIds.get(i)).orElseThrow(() -> new EntityNotFoundException("Menu Entity Not Found"));;

            Sm sm = Sm.builder()
                    .vip(vip)
                    .menu(menu)
                    .build();

            Sm savedSm = smRepository.save(sm);
            result++;

        }
        return result;
    }


//    @Override
//    public void updateSavedMenu(int smId) {
//        Sm sm = smRepository.findById(smId).orElseThrow(() -> new EntityNotFoundException("Sm Entity Not Found"));
//
//        smRepository.deleteById(smId);
//
//    }
}
