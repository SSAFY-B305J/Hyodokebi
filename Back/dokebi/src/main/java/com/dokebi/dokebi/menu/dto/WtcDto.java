package com.dokebi.dokebi.menu.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WtcDto {

    private int wtcId;
    private String WtcName;
    @Builder
    public WtcDto(int wtcId, String wtcName) {
        this.wtcId = wtcId;
        WtcName = wtcName;
    }
}
