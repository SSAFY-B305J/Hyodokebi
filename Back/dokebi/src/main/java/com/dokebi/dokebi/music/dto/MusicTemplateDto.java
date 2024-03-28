package com.dokebi.dokebi.music.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicTemplateDto {
    private List<Integer> vipSavedMusics;
    private List<Integer> vipDisLikedMusics;
    private int[] ageGroup;
    private int vipId;

    @Builder
    public MusicTemplateDto(List<Integer> vipSavedMusics, List<Integer> vipDisLikedMusics, int[] ageGroup, int vipId) {
        this.vipSavedMusics = vipSavedMusics;
        this.vipDisLikedMusics = vipDisLikedMusics;
        this.ageGroup = ageGroup;
        this.vipId = vipId;
    }
}
