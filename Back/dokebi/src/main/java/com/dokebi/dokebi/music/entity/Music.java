package com.dokebi.dokebi.music.entity;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


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

    @ManyToMany(mappedBy = "vipSavedMusics")
    private List<Vip> savedVips = new ArrayList<>();

}



