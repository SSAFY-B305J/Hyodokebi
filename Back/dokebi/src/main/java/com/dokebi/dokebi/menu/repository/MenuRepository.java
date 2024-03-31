package com.dokebi.dokebi.menu.repository;

import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer>  {

    @Query("SELECT new com.dokebi.dokebi.menu.dto.MenuDto(m.menuId, m.menuName, wc.menuImg) FROM WcMenu wc, Menu m WHERE wc.menu.menuId = m.menuId")
    List<MenuDto> findMenu();

    @Query("SELECT new com.dokebi.dokebi.menu.dto.MenuDto(m.menuId, m.menuName, c.cateImage) " +
            "FROM Menu m " +
            "JOIN Cate c ON m.cate.cateId = c.cateId " +
            "WHERE m.cate.cateId = (" +
            "    SELECT m2.cate.cateId " +
            "    FROM Menu m2 " +
            "    WHERE m2.menuId = (" +
            "        SELECT sm.menu.menuId " +
            "        FROM Sm sm " +
            "        WHERE sm.vip.vipId = :vipId" +
            "    )" +
            ")")
    List<MenuDto> findSavedMenu(int vipId);



//    int removeSavedMenu(int smId);



}
