package com.dokebi.dokebi.vip.entity;

import com.dokebi.dokebi.music.dto.MusicDto;
import com.dokebi.dokebi.music.entity.Music;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.util.Assert;

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

    @Builder
    public Vip(String vipNickName, int vipBirth, String vipProfile, List<Music> vipSavedMusics) {
        this.vipNickName = vipNickName;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
        this.vipSavedMusics = vipSavedMusics;
    }
}
