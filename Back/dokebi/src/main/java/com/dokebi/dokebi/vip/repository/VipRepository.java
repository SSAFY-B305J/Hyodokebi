package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.vip.entity.Vip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VipRepository extends JpaRepository<Vip, Integer> {
    @Query("Select v From Vip v Where v.vipNickName = :vnick")
    Optional<Vip> findByNickName(String vnick);

}
