package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.vip.dto.VipDto;
import com.dokebi.dokebi.vip.entity.Vip;
import jakarta.persistence.EntityNotFoundException;

public interface VipService {
    VipDto findVip(int vid);
    int addVip(VipDto vipDto);
    void removeVip(int vid);

}
