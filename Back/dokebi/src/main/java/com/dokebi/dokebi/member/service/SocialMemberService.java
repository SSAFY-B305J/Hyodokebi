package com.dokebi.dokebi.member.service;

import com.dokebi.dokebi.common.JWT.JwtTokenProvider;
import com.dokebi.dokebi.common.JWT.TokenInfo;
import com.dokebi.dokebi.member.dto.SocialLoginDto;
import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.member.entity.MemberRole;
import com.dokebi.dokebi.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class SocialMemberService {

    @Value("${kakao.key}")
    private String kakaoRestAPIKey;
    @Value("${kakao.request-url}")
    private String REQUEST_URL;
    @Value("${kakao.user-info-url}")
    private String KAKAO_USERINFO_REQUEST_URL;
    @Value("${kakao.redirect-url}")
    private String REDIRECT_URL;

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public String login(SocialLoginDto socialLoginDto) {
        Member accessMember = null;

        try {
            accessMember = memberRepository.findByMemberId(socialLoginDto.getMemberId())
                    .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저가 존재하지 않습니다."));
        } catch (UsernameNotFoundException e) {
            accessMember= memberRepository.save(Member.builder()
                    .memberId(socialLoginDto.getMemberId())
                    .memberPass(socialLoginDto.getMemberPass())
                    .memberEmail(socialLoginDto.getMemberId() + "@kakao.com")
                    .memberNickname(socialLoginDto.getMemberNickname())
                    .memberRole(MemberRole.USER)
                    .build());
        }//db에 없으면 새로 회원가입


        //1. Memberindex 와 MemberPass로 Authentication 객체 생성
        //인증 여부를 확인하는 Authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                accessMember.getMemberIndex(), "kakao");

        //2. authenticate 매서드가 실행될 때 CustomUserDetailsService에서 만든 loadUserByUsername 매서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        //3. 인증 정보를 기반으로 JWT 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        //4. DB에 refreshToken 저장
        accessMember.setMemberRefreshToken(tokenInfo.getRefreshToken());
        return tokenInfo.getAccessToken();
    }

    public String getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        //request header 작성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", "application/json");
        //request body 작성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoRestAPIKey);
        params.add("redirect_uri", REDIRECT_URL);
        params.add("code", code);


        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity(REQUEST_URL, request, String.class);

        JSONObject jsonObject = new JSONObject(stringResponseEntity.getBody());
//        System.out.println(jsonObject.toString());
        return jsonObject.getString("access_token");
    }

    public HashMap<String, Object> getkakaoMemberInfo(String kakaoAccessToken) {
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
        memberInfo.put("id", jsonObject.get("id").toString());
        memberInfo.put("nickname", ((JSONObject) jsonObject.get("properties")).getString("nickname"));


        return memberInfo;
    }
}
