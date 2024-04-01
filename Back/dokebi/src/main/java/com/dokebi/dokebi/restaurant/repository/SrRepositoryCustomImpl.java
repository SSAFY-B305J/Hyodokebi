package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.menu.entity.Menu;
import com.dokebi.dokebi.menu.entity.QCate;
import com.dokebi.dokebi.menu.entity.QMenu;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantListResponseDto;
import com.dokebi.dokebi.restaurant.dto.SavedRestaurantRequestDto;
import com.dokebi.dokebi.restaurant.entity.QRestaurant;
import com.dokebi.dokebi.restaurant.entity.QSr;
import com.dokebi.dokebi.restaurant.entity.Restaurant;
import com.dokebi.dokebi.restaurant.entity.Sr;
import com.dokebi.dokebi.restaurant.service.RestaurantService;
import com.dokebi.dokebi.vip.entity.QVip;
import com.dokebi.dokebi.vip.entity.Vip;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@RequiredArgsConstructor
public class SrRepositoryCustomImpl implements SrRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private final RestaurantService restaurantService;
    private final EntityManager entityManager;

    @Override
    @Transactional
    public List<SavedRestaurantListResponseDto> findSrByVipId(int vid) {

        QSr qSr = QSr.sr;
        QRestaurant qRestaurant = QRestaurant.restaurant;
        QMenu qMenu = QMenu.menu;
        QCate qCate = QCate.cate;

        System.out.println("1");
        // Sr 리스트 가져오기
        List<Sr> srList = queryFactory.selectFrom(qSr)
                .where(qSr.vip.vipId.eq(vid))
                .fetch();

        System.out.println("1");
        // 식당 정보 가져오기
        List<SavedRestaurantListResponseDto> resList = new ArrayList<>();

        for (Sr sr : srList) {
            System.out.println("2");
            Restaurant res = queryFactory.selectFrom(qRestaurant)
                    .where(qRestaurant.restaurantId.eq(sr.getRestaurant().getRestaurantId()))
                    .fetchOne();

            Menu resMenu = queryFactory.selectFrom(qMenu)
                    .where(qMenu.menuId.eq(res.getMenu().getMenuId()))
                    .fetchOne();

            String resCate = queryFactory.select(qCate.cateName)
                    .from(qCate)
                    .where(qCate.cateId.eq(resMenu.getCate().getCateId()))
                    .fetchOne();

            SavedRestaurantListResponseDto rslt = new SavedRestaurantListResponseDto(res.getRestaurantId(), res.getRestaurantName(), res.getRestaurantAddress(), res.getRestaurantUrl(), resCate);
            resList.add(rslt);


        }
        System.out.println(resList);
        return resList;
    }

    @Override
    @Transactional
    public void addSavedRestaurant(int vid, SavedRestaurantRequestDto sr) {

        QSr qSr = QSr.sr;
        QVip qvip = QVip.vip;
        QMenu qMenu = QMenu.menu;

        // 해당 식당의 메뉴 정보 가져오기
        Menu srMenu = queryFactory.selectFrom(qMenu)
                .where(qMenu.menuId.eq(sr.getMenuId()))
                .fetchOne();

        // 식당 정보가 이미 저장되어 있는 곳인지 확인
        Restaurant res = restaurantService.findRestaurant(sr.getRestaurantLat(), sr.getRestaurantLong());
        System.out.println("_____________________________");
        System.out.println(res);
        System.out.println("_____________________________");
        // 없으면 저장
        if (res == null) {
            System.out.println('A');
            Restaurant plusRes = new Restaurant(
                    sr.getRestaurantName(),
                    sr.getRestaurantAddress(),
                    sr.getRestaurantNumber(),
                    sr.getRestaurantUrl(),
                    sr.getRestaurantLat(),
                    sr.getRestaurantLong(),
                    srMenu
            );
            res = restaurantService.addRestaurant(plusRes);
        }

        System.out.println("B");
        System.out.println(res);
        System.out.println("================");
        // vip 정보 가져오기
        Vip vip = queryFactory.selectFrom(qvip)
                .where(qvip.vipId.eq(vid))
                .fetchOne();

        // Sr 에 저장
        // 네이티브 쿼리를 사용하여 Sr 엔티티를 저장
        String nativeQuery = "INSERT INTO Sr (restaurant_restaurant_id, vip_vip_id) VALUES (?, ?)";
        Query query = entityManager.createNativeQuery(nativeQuery);
        query.setParameter(1, res.getRestaurantId());
        query.setParameter(2, vip.getVipId());

        // 쿼리 실행
        query.executeUpdate();

    }
}
