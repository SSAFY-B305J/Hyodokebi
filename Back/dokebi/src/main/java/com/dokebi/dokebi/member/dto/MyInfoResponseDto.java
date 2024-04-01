package com.dokebi.dokebi.member.dto;


import com.dokebi.dokebi.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyInfoResponseDto {
    private String memberId, memberNickname, memberEmail;


    public MyInfoResponseDto(Member member) {
        memberId = member.getMemberId();
        memberNickname = member.getMemberNickname();
        memberEmail = member.getMemberEmail();
    }
}
