package com.dokebi.dokebi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberUpdateRequestDto {
    private int memberIndex;
    private String memberNickname, memberEmail, memberPass, memberProfile;

}