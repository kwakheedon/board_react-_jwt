package com.example.board.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long userId;
    private String nickname;
    private String email;
    
    public static TokenResponse fromEntity(String accessToken, String refreshToken,Long userId,String nickname,String email) {
        return new TokenResponse(accessToken, refreshToken, userId, nickname, email);
    }
}