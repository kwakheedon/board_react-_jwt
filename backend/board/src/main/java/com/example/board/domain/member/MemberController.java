package com.example.board.domain.member;

import com.example.board.domain.member.dto.LoginReq;
import com.example.board.domain.member.dto.SignUpReq;
import com.example.board.domain.member.dto.TokenResponse;
import com.example.board.exception.ApiResponse;
import com.example.board.security.jwt.CookieUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final CookieUtil cookieUtil;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@RequestBody SignUpReq signUpReq) {
        memberService.signup(signUpReq);
        return ResponseEntity.ok(ApiResponse.success("회원가입 성공", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody LoginReq loginReq,HttpServletResponse response) {
        // 서비스의 login 메소드는 이제 TokenResponse를 반환
    	TokenResponse tokenResponse  = memberService.login(loginReq, response);
        return ResponseEntity.ok(ApiResponse.success("로그인 성공", tokenResponse));
    }
  
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<TokenResponse>>reissue(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        TokenResponse tokenResponse = memberService.reissueToken(refreshToken, response); // response 객체 전달
        return ResponseEntity.ok(ApiResponse.success("토큰재발급 성공", tokenResponse));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response){
        memberService.logout(refreshToken);
        cookieUtil.deleteCookie(response, "refreshToken"); // 쿠키 삭제
        return ResponseEntity.ok(ApiResponse.success("로그아웃 성공", null));
    }
    
}