package com.dokebi.dokebi.member.service;

import com.dokebi.dokebi.common.JWT.JwtTokenProvider;
import com.dokebi.dokebi.common.JWT.TokenInfo;
import com.dokebi.dokebi.member.dto.MemberJoinRequestDto;
import com.dokebi.dokebi.member.dto.OriginLoginRequestDto;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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


    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenInfo login(OriginLoginRequestDto dto) {
        Member loginUser = loginPassCheck(dto);

        if(loginUser!=null){
            //1. Memberindex 와 MemberPass로 Authentication 객체 생성
            //인증 여부를 확인하는 Authenticated 값이 false
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginUser.getMemberIndex(), dto.getMemberPass());
            //2. authenticate 매서드가 실행될 때 CustomUserDetailsService에서 만든 loadUserByUsername 매서드 실행
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            //3. 인증 정보를 기반으로 JWT 생성
            TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

            //4. DB에 refreshToken 저장
            loginUser.setMemberRefreshToken(tokenInfo.getRefreshToken());
            return tokenInfo;
        }else{
            throw new UsernameNotFoundException("아이디나 비밀번호가 일치하지 않습니다.");
        }

    }

    public Member loginPassCheck(OriginLoginRequestDto dto){
        Member loginMember = memberRepository.findByMemberId(dto.getMemberId()).orElseThrow(()-> new UsernameNotFoundException("해당 아이디를 가진 유저가 존재하지 않습니다."));
        if(bCryptPasswordEncoder.matches(dto.getMemberPass(), loginMember.getMemberPass())){
            return loginMember;
        }else {
            return null;
        }
    }

    public void join(MemberJoinRequestDto dto){
        dto.setMemberPass(bCryptPasswordEncoder.encode(dto.getMemberPass()));
        Member joinMember = dto.toEntity();
        memberRepository.save(joinMember);
    }




}
