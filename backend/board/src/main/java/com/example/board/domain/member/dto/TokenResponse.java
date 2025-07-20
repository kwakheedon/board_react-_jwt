package com.example.board.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    
    
    public static TokenResponse fromEntity(String accessToken, String refreshToken) {
        return new TokenResponse(accessToken, refreshToken);
    }
}