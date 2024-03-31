package com.dokebi.dokebi.member.service;

import com.dokebi.dokebi.common.JWT.JwtTokenProvider;
import com.dokebi.dokebi.common.JWT.TokenInfo;
import com.dokebi.dokebi.common.email.Aes256;
import com.dokebi.dokebi.common.email.EmailSender;
import com.dokebi.dokebi.member.dto.MemberFindPassRequestDto;
import com.dokebi.dokebi.member.dto.MemberJoinRequestDto;
import com.dokebi.dokebi.member.dto.MemberUpdateRequestDto;
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
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {


    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailSender emailSender;
    private final Aes256 aes256;


    public String login(OriginLoginRequestDto dto) {
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
            return tokenInfo.getAccessToken();
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


    public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
        Member member = memberRepository.findByMemberIndex(memberUpdateRequestDto.getMemberIndex())
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        Optional.ofNullable(memberUpdateRequestDto.getMemberNickname()).ifPresent(member::setMemberNickname);
        Optional.ofNullable(memberUpdateRequestDto.getMemberPass()).ifPresent(member::setMemberPass);
        Optional.ofNullable(memberUpdateRequestDto.getMemberEmail()).ifPresent(member::setMemberEmail);
    }

    public boolean checkDup(String category, String input) {
        //category로 id, email, nickname의 값이 넘어오면 해당하는 중복검사 실행
        //true = 해당하는 값이 이미 있음
        boolean check = switch (category){
            case "id"->memberRepository.existsByMemberId(input);

            case "email"-> memberRepository.existsByMemberEmail(input);

            case "nickname" -> memberRepository.existsByMemberNickname(input);

            default -> throw new IllegalStateException("올바른 category가 아닙니다. ");
        };
        return check;
    }

    public void deleteMember(int accessMemberIndex) {

        memberRepository.deleteById(accessMemberIndex);
    }

    public String sendEmail(String email, String order) {
        String result = "";
        String title = "";
        String content = "";
        switch (order) {
            case "check_email":
                title = "dokebi 이메일 인증 코드입니다.";
                content = "dokebi에서 보낸 이메일 인증용 코드입니다.<br>아래의 인증번호를 입력해 주세요.<br><br>코드: ";
                result = emailSender.generateCode();
                emailSender.sendMail(email, title, content + result);
                result = aes256.encrypt(result);
                break;
            case "find_pass":
                title = "dokebi에서 생성한 임시 비밀번호입니다.";
                content = "dokebi에서 생성한 임시 비밀번호입니다.<br>아래의 비밀번호를 사용해 로그인해 주세요.<br><br>임시 비밀번호: ";
                result = emailSender.generateCode();
                emailSender.sendMail(email, title, content + result);
                break;
        }
        return result;
    }
    public void findPass(MemberFindPassRequestDto dto) {
        Member accessMember = memberRepository.findByMemberIdAndMemberEmail
                        (dto.getMemberId()
                                , dto.getMemberEmail())
                .orElseThrow(() -> new UsernameNotFoundException("사용자 정보를 찾을 수 없습니다."));
        String tmpPass = sendEmail(accessMember.getMemberEmail(), "find_pass");
        //암호화
        accessMember.setMemberPass(bCryptPasswordEncoder.encode(tmpPass));
    }


    public String findId(String email) {
        Member findMember = memberRepository.findByMemberEmail(email).orElseThrow(()->new UsernameNotFoundException("email에 해당하는 사용자가 없습니다."));

        return findMember.getMemberId();
    }


    public Member info(int accessMemberIndex) {
        return memberRepository.findByMemberIndex(accessMemberIndex).orElseThrow(()->new UsernameNotFoundException("해당하는 사용자가 없습니다."));
    }
}
