package com.example.board.security.jwt.dto;

import com.example.board.domain.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    @Id // 이 필드가 기본 키(PK)임을 명시합니다.
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // Member 엔티티의 PK 값을 RefreshToken의 PK 값으로 사용하도록 매핑합니다.
    @JoinColumn(name = "member_id") // 외래 키(FK)의 이름을 지정합니다.
    private Member member;

    // 토큰 값의 유일성을 보장하기 위해 unique = true 추가
    @Column(nullable = false, length = 500, unique = true)
    private String tokenValue;

    @Builder
    public RefreshToken(Member member, String tokenValue) {
        this.member = member;
        this.tokenValue = tokenValue;
    }

    // 토큰 값만 간단히 업데이트하는 메소드
    public void updateTokenValue(String newTokenValue) {
        this.tokenValue = newTokenValue;
    }
}