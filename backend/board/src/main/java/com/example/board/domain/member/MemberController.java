package com.example.board.domain.member;

import com.example.board.domain.member.dto.LoginReq;
import com.example.board.domain.member.dto.SignUpReq;
import com.example.board.exception.ApiResponse;
import com.example.board.security.jwt.dto.TokenResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@RequestBody SignUpReq signUpReq) {
        memberService.signup(signUpReq);
        return ResponseEntity.ok(ApiResponse.success("회원가입 성공", null));
    }

    /**
     * 로그인 API
     * 성공 시, Body에 Access Token과 Refresh Token을 담아 반환합니다.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody LoginReq loginReq) {
        // 서비스의 login 메소드는 이제 TokenResponse를 반환합니다.
        TokenResponse response = memberService.login(loginReq);
        return ResponseEntity.ok(ApiResponse.success("로그인 성공", response));
    }
}
