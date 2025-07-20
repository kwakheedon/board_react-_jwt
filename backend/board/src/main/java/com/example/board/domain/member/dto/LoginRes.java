package com.example.board.domain.member.dto;

import com.example.board.domain.member.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRes {
    private String email;
    private String nickname;
    private Role role;
}
