package com.dokebi.dokebi.restaurant.repository;

import com.dokebi.dokebi.restaurant.entity.Sr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SrRepository extends JpaRepository<Sr, Integer>, SrRepositoryCustom {

}
