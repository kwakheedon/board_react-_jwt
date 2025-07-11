package com.example.board.domain.member;

import com.example.board.domain.member.dto.LoginReq;
import com.example.board.domain.member.dto.SignUpReq;
import com.example.board.exception.CustomException;
import com.example.board.exception.ErrorCode;
import com.example.board.security.jwt.JwtUtil;
import com.example.board.security.jwt.RefreshTokenRepository;
import com.example.board.security.jwt.dto.RefreshToken;
import com.example.board.security.jwt.dto.TokenResponse;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입
    @Transactional
    public void signup(SignUpReq request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXISTS, "이미 사용 중인 이메일입니다.");
        }
        if(memberRepository.existsBynickname(request.getNickname())) {
        	throw new CustomException(ErrorCode.NICKNAME_ALREADY_EXISTS, "이미 사용 중인 넥네임입니다.");
        }
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        Member member = Member.builder()
                .email(request.getEmail())
                .password(encryptedPassword)
                .nickname(request.getNickname())
                .role(Role.USER) 
                .build();
        memberRepository.save(member);
    }
    
    // 로그인
    @Transactional
    public TokenResponse login(LoginReq loginReq) {
        Member member = memberRepository.findByEmail(loginReq.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.LOGIN_FAIL, "이메일 또는 비밀번호가 일치하지 않습니다."));
        if (!passwordEncoder.matches(loginReq.getPassword(), member.getPassword())) {
            throw new CustomException(ErrorCode.LOGIN_FAIL, "이메일 또는 비밀번호가 일치하지 않습니다.");
        }
        // Access Token과 Refresh Token을 생성.
        String accessToken = jwtUtil.generateAccessToken(member.getEmail(), member.getRole());
        String refreshTokenValue = jwtUtil.generateRefreshToken(member.getEmail());

        // Refresh Token을 DB에 저장/업데이트.
        member.updateRefreshToken(refreshTokenValue);
        RefreshToken token = member.getRefreshToken();
        if (token == null) {
            token = RefreshToken.builder()
                .member(member)
                .tokenValue(refreshTokenValue)
                .build();
        } else {
            token.updateTokenValue(refreshTokenValue);
        }
        refreshTokenRepository.save(token);
        
        return new TokenResponse(accessToken, refreshTokenValue);
    }
    
    
    
    //토큰 재발급
    @Transactional
    public TokenResponse reissueToken(String refreshTokenValue) {
        // 1.리프레시 토큰 유효성 검증 
        if (!jwtUtil.validateToken(refreshTokenValue)) {
            throw new CustomException(ErrorCode.INVALID_TOKEN, "유효하지 않은 리프레시 토큰입니다.");
        }

        // 2.DB에서 토큰 조회
        RefreshToken refreshToken = refreshTokenRepository.findByTokenValue(refreshTokenValue)
                .orElseThrow(() -> new CustomException(ErrorCode.TOKEN_NOT_FOUND, "리프레시 토큰을 찾을 수 없습니다. 다시 로그인해주세요."));

        // 3.토큰에 연결된 회원 정보로 새로운 토큰 발급
        return issueTokens(refreshToken.getMember());
    }
    //[내부 로직] Access Token과 Refresh Token을 생성하고 DB에 Refresh Token을 저장/업데이트
    @Transactional
    public TokenResponse issueTokens(Member member) {
        String accessToken = jwtUtil.generateAccessToken(member.getEmail(), member.getRole());
        String newRefreshTokenValue = jwtUtil.generateRefreshToken(member.getEmail());

        // Refresh Token을 DB에 저장/업데이트
        // Member 엔티티의 헬퍼 메서드를 통해 영속성 컨텍스트 내에서 상태를 변경합니다.
        member.updateRefreshToken(newRefreshTokenValue);

        return new TokenResponse(accessToken, newRefreshTokenValue);
    }
    
    
}

    
   



