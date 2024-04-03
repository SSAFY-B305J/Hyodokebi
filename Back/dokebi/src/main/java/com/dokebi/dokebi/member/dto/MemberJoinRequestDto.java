package com.dokebi.dokebi.member.dto;

import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.member.entity.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoinRequestDto {
    String memberId;
    String memberPass;
    String memberEmail;
    String memberNickname;


    public Member toEntity(){
        return Member.builder()
                .memberId(memberId)
                .memberPass(memberPass)
                .memberNickname(memberNickname)
                .memberEmail(memberEmail)
                .memberRole(MemberRole.USER)
                .memberProfile("0").build();
    }

}
