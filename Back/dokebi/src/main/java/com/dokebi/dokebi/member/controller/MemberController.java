package com.dokebi.dokebi.member.controller;

import com.dokebi.dokebi.common.JWT.TokenInfo;
import com.dokebi.dokebi.member.dto.*;
import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.member.service.MemberService;
import com.dokebi.dokebi.member.service.SocialMemberService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Operation(summary = "일반 로그인")
    @PostMapping("/login/origin")
    public ResponseEntity<Map<String, Object>> originLogin(@RequestBody OriginLoginRequestDto originLoginRequestDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String accessToken = "";
        try {
            accessToken =  memberService.login(originLoginRequestDto);

        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status)
                .header("accessToken",accessToken)
                .body(resultMap);
    }
    @Operation(summary = "카카오 로그인")
    @GetMapping("/login/kakao")
    public ResponseEntity<Map<String, Object>> kakaoLogin(@RequestParam("code") String code) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        String accessToken = "";
       
        try {
            String kakaoAccessToken = socialService.getKakaoAccessToken(code);
            System.out.println(("AccessToken 받음"));
            Map<String, Object> kakaoMemberInfo = socialService.getkakaoMemberInfo(kakaoAccessToken);
            System.out.println(("멤버인포 받음"));

            accessToken = socialService.login(SocialLoginDto.builder()
                    .memberId(kakaoMemberInfo.get("id").toString())
                    .memberPass(bCryptPasswordEncoder.encode("kakao"))
                    .memberNickname(kakaoMemberInfo.get("nickname").toString())
                    .build()

            );
            System.out.println(("로그인 성공"));
            resultMap.put("message","success");
        } catch (Exception e) {
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }


        return ResponseEntity.status(status)
                .header("accessToken",accessToken)
                .body(resultMap);

    }
    @Operation(summary = "유저 상세 정보")
    @GetMapping("/info")
    public ResponseEntity<MyInfoResponseDto> myInfo(HttpServletRequest request) {
        Member result = null;
        HttpStatus status = HttpStatus.OK;
        try {
            //토큰으로 유저 정보 받아옴
            int accessMemberIndex = (int) request.getAttribute("accessMemberIndex");
            log.info("myinfo={}", accessMemberIndex);
            result = memberService.info(accessMemberIndex);
        } catch (NullPointerException e) {
            status = HttpStatus.NOT_FOUND;
        } catch (Exception e) {
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(new MyInfoResponseDto(result));
    }


    @Operation(summary = "회원가입")
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

    @Operation(summary = "유저 정보 수정")
    @PutMapping("/info")
    public ResponseEntity<Map<String, Object>> updateMember(@RequestBody MemberUpdateRequestDto memberUpdateRequestDto, HttpServletRequest request) {
        HttpStatus status = HttpStatus.OK;
        Map<String, Object> resultMap = new HashMap<>();
        try {
            //신청유저 != 대상유저인데 관리자도 아니라면
            if ((int) request.getAttribute("accessMemberIndex") != memberUpdateRequestDto.getMemberIndex()
                    && !request.getAttribute("accessMemberRole").equals("ADMIN")) {
                status = HttpStatus.UNAUTHORIZED;
                throw new IllegalAccessException("잘못된 접근입니다.");
            }
            //암호화
            if (memberUpdateRequestDto.getMemberPass() != null)
                memberUpdateRequestDto.setMemberPass(bCryptPasswordEncoder.encode(memberUpdateRequestDto.getMemberPass()));
            memberService.updateMember(memberUpdateRequestDto);
            resultMap.put("message", "success");
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }


    @Operation(summary = "카테고리 별 중복 검사.아이디, 닉네임, 이메일")
    @GetMapping("/check/{category}/{input}")
    public ResponseEntity<Map<String, Object>> dupCheck(@PathVariable String category,@PathVariable String input){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try{
            boolean dupCheck = memberService.checkDup(category,input);
            resultMap.put("dupCheck", dupCheck);
        }catch(Exception e){
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }
    @Operation(summary = "로그인한 유저 비밀번호 확인")
    @GetMapping("/auth/pass")
    public ResponseEntity<Map<String, Object>> checkPass(@RequestBody MemberCheckPassRequestDto memberCheckPassRequestDto, HttpServletRequest request){
        Map<String , Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try{
            boolean check = memberService.checkPass((int)request.getAttribute("accessMemberIndex"),memberCheckPassRequestDto.getMemberPass());
            resultMap.put("check", check);
        }catch (Exception e){
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }



    @Operation(summary = "유저 삭제")
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> memberDelete(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try{
            int accessMemberIndex = (int)request.getAttribute("accessMemberIndex");
            memberService.deleteMember(accessMemberIndex);
            resultMap.put("message","success");
        }catch(Exception e){
            log.info(e.getMessage());
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body((resultMap));
    }

    @Operation(summary = "이메일 검증 보내기")
    @GetMapping("/auth/{email}")
    public ResponseEntity<Map<String, Object>> sendEmail(@PathVariable String email) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            String code = memberService.sendEmail(email, "check_email");
            resultMap.put("code", code);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }

    @Operation(summary = "이메일로 아이디 보내기")
    @GetMapping("/find/id")
    public ResponseEntity<Map<String, Object>> findId(@RequestParam("email") String email) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            String id = memberService.findId(email);
            resultMap.put("id",id);
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }

    @Operation(summary = "이메일로 임시 비밀번호 보내기")
    @PostMapping("/find/pass")
    public ResponseEntity<Map<String, Object>> findPass(@RequestBody MemberFindPassRequestDto memberFindPassDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            memberService.findPass(memberFindPassDto);
            resultMap.put("message", "입력하신 이메일로 임시 비밀번호가 발송되었습니다.");
        } catch (Exception e) {
            resultMap.put("message", e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(resultMap);
    }



}
