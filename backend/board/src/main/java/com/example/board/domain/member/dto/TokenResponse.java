package com.example.board.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenResponse {
    private String accessToken;
    private Long userId;
    private String nickname;
    private String email;
    
    public static TokenResponse fromEntity(String accessToken,Long userId,String nickname,String email) {
        return new TokenResponse(accessToken, userId, nickname, email);
    }
}