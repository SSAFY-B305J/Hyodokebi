package com.dokebi.dokebi.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomExceptionStatus {
    // member 관련
    WRONG_ID(1001, "잘못된 아이디입니다");

    // 관련

    private final Integer code;
    private final String message;
}