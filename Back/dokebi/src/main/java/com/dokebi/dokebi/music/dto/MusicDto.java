package com.dokebi.dokebi.music.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MusicDto {
    private int musicId;
    private String musicName;
    private String musicSinger;
//    private int musicYear;
    private String musicImg;
    private String musicLyrics;
//    private String musicGenre;
//    private String musicComposer;

}
