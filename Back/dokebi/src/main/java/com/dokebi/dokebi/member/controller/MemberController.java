package com.dokebi.dokebi.member.controller;

import com.dokebi.dokebi.member.service.MemberService;
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

    private final  MemberService memberService;

    @GetMapping("/login/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String accessToken = "";
        try {
            String kakaoAccessToken = memberService.getKakaoAccessToken(code, "api/member/login/kakao");
            Map<String, Object> kakaoMemberInfo = memberService.getkakaoMemberInfo(kakaoAccessToken);
            System.out.println(kakaoMemberInfo.get("id").toString()+" : "+ UUID.nameUUIDFromBytes("kakao".getBytes()).toString());
            accessToken = memberService.login(kakaoMemberInfo.get("id").toString()
            , UUID.nameUUIDFromBytes("kakao".getBytes()).toString());

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


}
