package com.dokebi.dokebi.vip.service;

import com.dokebi.dokebi.vip.dto.VipDto;
import jakarta.persistence.EntityNotFoundException;

public interface VipService {
    VipDto findByVipId(int vid);
}
