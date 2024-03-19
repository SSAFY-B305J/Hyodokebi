package com.dokebi.dokebi.vip.entity;

import com.dokebi.dokebi.music.entity.Music;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Vip")
@Entity
public class Vip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vipId;
    @Column(nullable = false)
    private String vipNickName;
    @Column(nullable = false)
    private int vipBirth;
    @Column(nullable = false)
    private String vipProfile;

    @ManyToMany
    @JoinTable(name = "saved_music",
            joinColumns = @JoinColumn(name = "vip_id"),
            inverseJoinColumns = @JoinColumn(name = "music_id"))
    List<Music> vipSavedMusics = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "disliked_music",
            joinColumns = @JoinColumn(name = "vip_id"),
            inverseJoinColumns = @JoinColumn(name = "music_id"))
    List<Music> vipDisLikedMusics = new ArrayList<>();

    @Builder
    public Vip(String vipNickName, int vipBirth, String vipProfile, List<Music> vipSavedMusics, List<Music> vipDisLikedMusics) {
        this.vipNickName = vipNickName;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
        this.vipSavedMusics = vipSavedMusics;
        this.vipDisLikedMusics = vipDisLikedMusics;
    }

}
