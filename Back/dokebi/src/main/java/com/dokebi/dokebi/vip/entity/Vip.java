package com.dokebi.dokebi.vip.entity;

import com.dokebi.dokebi.menu.entity.Sm;
import com.dokebi.dokebi.member.entity.Member;
import com.dokebi.dokebi.music.entity.DisLikedMusic;
import com.dokebi.dokebi.music.entity.SavedMusic;
import com.dokebi.dokebi.restaurant.entity.Sr;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@SQLRestriction("is_deleted = false")
@SQLDelete(sql = "UPDATE VIP SET is_deleted = true WHERE vip_id = ?")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Vip")
@Entity
public class Vip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vipId;

    @Column(nullable = false)
    private String vipNickname;

    @Column(nullable = false)
    private int vipBirth;

    @Column(nullable = false)
    private int vipProfile;

    // 한 vip가 여러 개의 savedMusic을 생성할 수 있음
    // 해당 savedMusic은 한 vip에 귀속됨 여러 Music에 남길 수 없음
    @OneToMany(mappedBy = "vip")
    List<SavedMusic> vipSavedMusics = new ArrayList<>();

    @OneToMany(mappedBy = "vip")
    List<DisLikedMusic> vipDisLikedMusics = new ArrayList<>();

    @OneToMany(mappedBy = "vip")
    private List<Sm> sms = new ArrayList<>();

    @OneToMany(mappedBy = "vip")
    private List<Sr> srs;

    @ManyToOne(fetch=FetchType.LAZY)
    private Member member;


    private boolean isDeleted;

    @Builder
    public Vip(String vipNickname, int vipBirth, int vipProfile, List<SavedMusic> vipSavedMusics, List<DisLikedMusic> vipDisLikedMusics, List<Sr> srs, Member member) {
        this.vipNickname = vipNickname;
        this.vipBirth = vipBirth;
        this.vipProfile = vipProfile;
        this.vipSavedMusics = vipSavedMusics;
        this.vipDisLikedMusics = vipDisLikedMusics;
        this.srs = srs;
        this.member = member;
    }
}
