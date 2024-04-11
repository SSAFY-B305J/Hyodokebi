package com.dokebi.dokebi.menu.repository;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer>  {

    @Query("SELECT new com.dokebi.dokebi.menu.dto.MenuDto(m.menuId, m.menuName, wc.menuImg) FROM WcMenu wc, Menu m WHERE wc.menu.menuId = m.menuId")
    List<MenuDto> findMenu();

    @Query("SELECT new com.dokebi.dokebi.menu.dto.MenuDto(m.menuId, m.menuName, c.cateImage) " +
            "FROM Menu m, Cate c " +
            "WHERE m.cate.cateId = c.cateId " +
            "AND m.menuId IN (SELECT sm3.menu.menuId FROM Sm as sm3 WHERE sm3.vip.vipId = :vipId)")
    List<MenuDto> findSavedMenu(int vipId);

}
