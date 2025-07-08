package com.example.board.domain.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum Role {
    USER("ROLE_USER", "일반 사용자"),
    ADMIN("ROLE_ADMIN", "관리자");

    private final String key;   // Spring Security 권한으로 사용
    private final String title; // 프론트에서 사용자 타입 설명 등으로 사용
}