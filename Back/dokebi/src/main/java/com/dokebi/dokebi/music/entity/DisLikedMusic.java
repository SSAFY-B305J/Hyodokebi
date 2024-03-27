package com.dokebi.dokebi.music.entity;

import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "DISLIKED_MUSIC")
@Entity
public class DisLikedMusic {

    @Id
    @GeneratedValue
    private int dmId;

    @ManyToOne
    private Vip vip;

    @ManyToOne
    private Music music;

    @Builder
    public DisLikedMusic(Vip vip, Music music) {
        this.vip = vip;
        this.music = music;
    }
}
