package com.dokebi.dokebi.member.controller;

import com.dokebi.dokebi.member.dto.MemberJoinRequestDto;
import com.dokebi.dokebi.member.dto.OriginLoginRequestDto;
import com.dokebi.dokebi.member.dto.SocialLoginDto;
import com.dokebi.dokebi.member.service.MemberService;
import com.dokebi.dokebi.member.service.SocialMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


    @GetMapping("/login/origin")
    public ResponseEntity<Map<String, Object>> originLogin(@RequestBody OriginLoginRequestDto originLoginRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String accessToken = "";
        try {
            accessToken = memberService.login(originLoginRequestDto);
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status)
                .header("accessToken", accessToken)
                .body(resultMap);
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String accessToken = "";
        try {
            String kakaoAccessToken = socialService.getKakaoAccessToken(code);
            Map<String, Object> kakaoMemberInfo = socialService.getkakaoMemberInfo(kakaoAccessToken);


            accessToken = socialService.login(SocialLoginDto.builder()
                    .memberId(kakaoMemberInfo.get("id").toString())
                    .memberPass(UUID.nameUUIDFromBytes("kakao".getBytes()).toString())
                    .memberNickname(kakaoMemberInfo.get("nickname").toString())
                    .build()
            );

            resultMap.put("message", "success");
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }


        return ResponseEntity.status(status)
                .header("accessToken", accessToken)
                .body(resultMap);

    }

    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> originJoin(@RequestBody MemberJoinRequestDto memberJoinRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            log.info("dto={}",memberJoinRequestDto);
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
