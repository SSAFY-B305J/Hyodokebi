package com.dokebi.dokebi.music.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "MUSIC")
@Entity
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int musicId;

    @Column(nullable = false)
    private String musicName;

    @Column(nullable = false)
    private String musicSinger;

    @Column(nullable = false)
    private int musicYear;

    @Column(nullable = false)
    private String musicImg;

    private String musicLyrics;

    private String musicGenre;

    private String musicComposer;

    private int musicLike;

}



