package com.example.board.domain.member;

import com.example.board.domain.comment.Comment; 
import com.example.board.domain.post.Post;
import com.example.board.security.jwt.dto.RefreshToken;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "members") 
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 50)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    // RefreshToken과의 1:1 관계 매핑 추가
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private RefreshToken refreshToken;
    // 리프레시 토큰 갱신 로직 수정
    public void updateRefreshToken(String tokenValue) {
        if (this.refreshToken == null) {
            // 기존에 토큰이 없으면 새로 생성
            this.refreshToken = RefreshToken.builder()
                    .member(this)
                    .tokenValue(tokenValue)
                    .build();
        } else {
            // 기존에 토큰이 있으면 값만 업데이트
            this.refreshToken.updateTokenValue(tokenValue);
        }
    }
    
    
    //'mappedBy'는 Post 엔티티에 있는 Member 타입 필드 이름("member")을 가리켜야 합니다.
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    //'mappedBy'는 Comment 엔티티에 있는 Member 타입 필드 이름("member")을 가리켜야 합니다.
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Member(String email, String password, String nickname, Role role) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
    }
}