package com.dokebi.dokebi.music.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MusicDto {
    private int musicId;
    private int musicName;
    private String musicSinger;
    private int musicYear;
    private String musicImg;
    private String musicLyrics;

}
