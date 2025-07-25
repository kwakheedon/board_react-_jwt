package com.example.board.domain.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginReq {
	
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수 입력입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력입니다.")
    private String password;
    
    
	
}