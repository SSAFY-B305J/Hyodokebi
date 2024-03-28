package com.dokebi.dokebi.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OriginLoginRequestDto {
    String memberId;
    String memberPass;
}
