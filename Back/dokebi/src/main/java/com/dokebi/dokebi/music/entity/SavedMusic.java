package com.dokebi.dokebi.music.entity;


import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cache;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "SAVED_MUSIC")
@Entity
public class SavedMusic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smId;

    @ManyToOne
    private Vip vip;

    @ManyToOne
    private Music music;

    @Builder
    public SavedMusic(Vip vip, Music music) {
        this.vip = vip;
        this.music = music;
    }
}
