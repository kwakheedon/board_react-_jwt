package com.example.board.domain.member;

import com.example.board.domain.member.dto.LoginReq;
import com.example.board.domain.member.dto.SignUpReq;
import com.example.board.domain.member.dto.TokenResponse;
import com.example.board.exception.CustomException;
import com.example.board.exception.ErrorCode;
import com.example.board.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /// 회원가입
    @Transactional
    public void signup(SignUpReq request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(ErrorCode.USER_ALREADY_EXISTS, "이미 사용 중인 이메일입니다.");
        }

        if (memberRepository.existsByNickname(request.getNickname())) {
            throw new CustomException(ErrorCode.NICKNAME_ALREADY_EXISTS, "이미 사용 중인 닉네임입니다.");
        }

        String encoded = passwordEncoder.encode(request.getPassword());
        Member member = request.toEntity(encoded);
        memberRepository.save(member);
    }

    /// 로그인 
    @Transactional
    public TokenResponse login(LoginReq loginReq) {
        Member member = memberRepository.findByEmail(loginReq.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.LOGIN_FAIL, "이메일 또는 비밀번호가 일치하지 않습니다."));

        if (!passwordEncoder.matches(loginReq.getPassword(), member.getPassword())) {
            throw new CustomException(ErrorCode.LOGIN_FAIL, "이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        return issueTokens(member); // 내부 issueTokens 메소드를 호출하도록 변경하여 코드 중복 제거
    }

    /// 토큰 재발급
    @Transactional
    public TokenResponse reissueToken(String refreshTokenValue) {
        if (!jwtUtil.validateToken(refreshTokenValue)) {
            throw new CustomException(ErrorCode.INVALID_TOKEN, "유효하지 않은 리프레시 토큰입니다.");
        }
        String email = jwtUtil.getEmailFromToken(refreshTokenValue);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "사용자를 찾을 수 없습니다."));

        if (!refreshTokenValue.equals(member.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_TOKEN, "토큰이 일치하지 않습니다.");
        }
        return issueTokens(member);
    }

    ///[내부 로직] Access Token과 Refresh Token을 생성하고 Member 엔티티에 Refresh Token을 저장
    @Transactional
    public TokenResponse issueTokens(Member member) {
        String accessToken = jwtUtil.generateAccessToken(member.getEmail(), member.getRole());
        String newRefreshTokenValue = jwtUtil.generateRefreshToken(member.getEmail());

        member.updateRefreshToken(newRefreshTokenValue);

        return new TokenResponse(
            accessToken,
            newRefreshTokenValue,
            member.getId(),        
            member.getNickname(),  
            member.getEmail()      
        );
    }

    ///로그아웃 
    @Transactional
    public void logout(String refreshToken) {
        String email = jwtUtil.getEmailFromToken(refreshToken);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND, "사용자를 찾을 수 없습니다."));

        member.updateRefreshToken(null);
    }
}