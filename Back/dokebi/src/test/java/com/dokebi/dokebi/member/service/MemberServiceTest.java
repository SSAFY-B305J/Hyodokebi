package com.dokebi.dokebi.member.service;

import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MemberServiceTest {

    @MockBean
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void db연결확인(){
        //given
        final Member member = Member.builder()
                .memberId("ssafy")
                .memberEmail("ssafy@ssafy.com")
                .memberNickname("전싸피")
                .memberProfile("이미지 경로")
                .build();
        //when
        final Member result = memberRepository.save(member);
        //then
        assertThat(result.getMemberId()).isEqualTo("ssafy");
        assertThat(result.getMemberEmail()).isEqualTo("ssafy@ssafy.com");
        assertThat(result.getMemberNickname()).isEqualTo("전싸피");
    }

    @Test
    public void 카카오로그인테스트(){
        //given
        String code = "";
        String url = "api/member/login/kakao";

        //when
        String accessToken = memberService.getKakaoAccessToken(code,url);
        //then
        assertThat(accessToken).isNotNull();
        System.out.println(accessToken);
    }

}