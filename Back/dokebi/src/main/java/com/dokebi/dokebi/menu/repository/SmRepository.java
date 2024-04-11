package com.dokebi.dokebi.menu.repository;

import com.dokebi.dokebi.menu.entity.Sm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SmRepository extends JpaRepository<Sm, Integer> {
}
