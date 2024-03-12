package com.dokebi.dokebi.vip.repository;

import com.dokebi.dokebi.vip.entity.Vip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VipRepository extends JpaRepository<Vip, Integer> {
}
