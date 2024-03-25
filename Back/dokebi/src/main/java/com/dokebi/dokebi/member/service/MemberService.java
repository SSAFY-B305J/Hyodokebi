package com.dokebi.dokebi.member.service;

import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.member.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {

    @Value("${kakao.key}")
    private String kakaoRestAPIKey;

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    public String login(String memberId, String memberPass) {
        Member accessMember = memberRepository.findByMemberIdAndMemberPass(memberId,memberPass)
                .orElseThrow(()->new UsernameNotFoundException("해당하는 유저가 존재하지 않습니다."));

        //1. Memberindex 와 MemberPass로 Authentication 객체 생성
        //인증 여부를 확인하는 Authenticated 값이 false
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                accessMember.getMemberIndex(), memberPass);
        
        //2. authenticate 매서드가 실행될 때 CustomUserDetailsService에서 만든 loadUserByUsername 매서드 실행
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //3. 인증 정보를 기반으로 JWT 생성
        return "";
    }

    public String getKakaoAccessToken(String code, String url) {
        String REQUEST_URL = "https://kauth.kakao.com/oauth/token";
        RestTemplate restTemplate = new RestTemplate();

        //request header 작성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", "application/json");
        //request body 작성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type","authorization_code");
        params.add("client_id",kakaoRestAPIKey);
        params.add("redirect_uri", "http://localhost:8080/" + url);
        params.add("code",code);



        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(REQUEST_URL,request, String.class);

        JSONObject jsonObject = new JSONObject(stringResponseEntity.getBody());
//        System.out.println(jsonObject.toString());
        return jsonObject.getString("access_token");
        }

    public HashMap<String, Object> getkakaoMemberInfo(String kakaoAccessToken) {
        String KAKAO_USERINFO_REQUEST_URL = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Authorization", "Bearer " + kakaoAccessToken);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(KAKAO_USERINFO_REQUEST_URL, request, String.class);

        //카카오 유저 정보
        JSONObject jsonObject = new JSONObject(stringResponseEntity.getBody());
//        System.out.println(jsonObject.toString());
        HashMap<String, Object> memberInfo = new HashMap<>();
        memberInfo.put("id",jsonObject.get("id").toString());
        memberInfo.put("nickname",((JSONObject)jsonObject.get("properties")).getString("nickname"));


        return memberInfo;
    }


}
