package com.dokebi.dokebi.music.dto;

import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MusicDto {

    private int musicId;

    private int musicYear;

    private String musicName;

    private String musicSinger;

    private String musicImg;

    private String musicLyrics;

    @Builder
    public MusicDto(int musicId, int musicYear, String musicName, String musicSinger, String musicImg, String musicLyrics) {
        this.musicId = musicId;
        this.musicYear = musicYear;
        this.musicName = musicName;
        this.musicSinger = musicSinger;
        this.musicImg = musicImg;
        this.musicLyrics = musicLyrics;
    }
}
