package com.dokebi.dokebi.member.controller;

import com.dokebi.dokebi.common.JWT.TokenInfo;
import com.dokebi.dokebi.member.dto.MemberJoinRequestDto;
import com.dokebi.dokebi.member.dto.OriginLoginRequestDto;
import com.dokebi.dokebi.member.dto.SocialLoginDto;
import com.dokebi.dokebi.member.service.MemberService;
import com.dokebi.dokebi.member.service.SocialMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final SocialMemberService socialService;


    @PostMapping("/login/origin")
    public ResponseEntity<Map<String, Object>> originLogin(@RequestBody OriginLoginRequestDto originLoginRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        TokenInfo Token = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            Token = memberService.login(originLoginRequestDto);
            headers.add("accessToken", Token.getAccessToken());
            headers.add("refreshToken", Token.getRefreshToken());
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status)
                .headers(headers)
                .body(resultMap);
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        TokenInfo Token = null;
        HttpHeaders headers = new HttpHeaders();
        try {
            String kakaoAccessToken = socialService.getKakaoAccessToken(code);
            Map<String, Object> kakaoMemberInfo = socialService.getkakaoMemberInfo(kakaoAccessToken);


            Token = socialService.login(SocialLoginDto.builder()
                    .memberId(kakaoMemberInfo.get("id").toString())
                    .memberPass(UUID.nameUUIDFromBytes("kakao".getBytes()).toString())
                    .memberNickname(kakaoMemberInfo.get("nickname").toString())
                    .build()
            );
            headers.add("accessToken", Token.getAccessToken());
            headers.add("refreshToken", Token.getRefreshToken());
            resultMap.put("message","success");
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }


        return ResponseEntity.status(status)
                .headers(headers)
                .body(resultMap);

    }

    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> originJoin(@RequestBody MemberJoinRequestDto memberJoinRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            log.info("dto={}", memberJoinRequestDto);
            memberService.join(memberJoinRequestDto);
            resultMap.put("message", "success");
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }


}
