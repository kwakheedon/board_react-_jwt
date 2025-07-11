package com.example.board.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 1. 기본 설정: CSRF, 세션, 기본 로그인 폼 비활성화
        http
            // ⭐️ 이 부분이 CSRF 방어 기능을 비활성화하는 설정입니다.
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable);

        // 2. 경로별 접근 권한 설정
        http
            .authorizeHttpRequests(auth -> auth
                // ⭐️ context-path를 제외한 경로인 "/api/signup"에 대한 접근을 허용합니다.
                .requestMatchers("/api/signup","/api/login").permitAll()
                
                // 나머지 모든 요청은 인증이 필요합니다.
                .anyRequest().authenticated()
            );

        return http.build();
    }
}