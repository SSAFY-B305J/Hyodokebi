package com.dokebi.dokebi.menu.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.dokebi.dokebi.menu.dto.MenuDto;
import com.dokebi.dokebi.menu.entity.Menu;
import com.dokebi.dokebi.menu.entity.Sm;
import com.dokebi.dokebi.menu.repository.MenuRepository;
import com.dokebi.dokebi.menu.repository.SmRepository;
import com.dokebi.dokebi.vip.entity.Vip;
import com.dokebi.dokebi.vip.repository.VipRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    public List<MenuDto> recommendedMenus(int vid, List<Integer> menuIds) throws JsonProcessingException {
        // RestAPI의 요청과 응답을 받을 수 있는 템플릿
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        // 플라스크 엔드포인트
        String flaskEndpoint = "http://127.0.0.1:5000/pyapi/menu/"+vid;


        // 음식 리스트
        Map<String, List<Integer>> requestBody = new HashMap<>();
        requestBody.put("menuIds", menuIds);

        // 헤더와 함께 요청을 위한 HttpEntity 객체 생성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, List<Integer>>> entity = new HttpEntity<>(requestBody, headers);

        // flask api로 post하고 응답을 받음
        String response = restTemplate.postForObject(flaskEndpoint, entity, String.class);

        // 플라스크 api에서 객체로 보낸 응답을 jackson library의 objectMapper로 읽어옴
        // 단일 객체면 객체.class, 복수 객체면 typeReference로 지정해야 함
        // jsonprocessingexception 오류가 날 수 있음
        List<MenuDto> recommendedMenus = objectMapper.readValue(response, new TypeReference<List<MenuDto>>() {
        });

        return recommendedMenus;
    }

    @Override
    public String startTrain() {

        RestTemplate restTemplate = new RestTemplate();
        String flaskEndpoint = "http://127.0.0.1:5000/pyapi/menu/";

        // GET 요청을 보내고 응답을 문자열로 받습니다.
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(flaskEndpoint, String.class);

        // 응답 문자열을 반환합니다.
        return responseEntity.getBody();
    }




//    @Override
//    public void updateSavedMenu(int smId) {
//        Sm sm = smRepository.findById(smId).orElseThrow(() -> new EntityNotFoundException("Sm Entity Not Found"));
//
//        smRepository.deleteById(smId);
//
//    }
}
