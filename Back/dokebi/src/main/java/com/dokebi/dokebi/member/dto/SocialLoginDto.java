package com.dokebi.dokebi.member.dto;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialLoginDto {
    String memberId;
    String memberPass;
    String memberNickname;
    String memberEmail;
}
