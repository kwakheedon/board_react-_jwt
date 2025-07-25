package com.example.board.security;

import com.example.board.security.jwt.CustomUserDetailsService;
import com.example.board.security.jwt.JwtAuthenticationFilter;
import com.example.board.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 1. 기본 설정 비활성화
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable);

        // 2. CORS 설정 추가 (가장 중요!)
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // 3. 경로별 접근 권한 설정
        http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/api/posts/**", "/api/comments/**").permitAll() // GET 요청은 대부분 허용
            .requestMatchers("/api/login", "/api/signup", "/api/reissue","/api/logout").permitAll() // 로그인/회원가입/재발급은 허용
            .anyRequest().authenticated() // 나머지 요청은 인증 필요
        );
            
        // 4. JWT 필터 추가
        http.addFilterBefore(new JwtAuthenticationFilter(jwtUtil, customUserDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    //CORS 설정을 위한 Bean. 프론트엔드와의 통신을 위해 반드시 필요합니다.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 허용할 프론트엔드 Origin 설정 (예: http://localhost:3000)
        configuration.setAllowedOrigins(List.of(
        	    "http://localhost:3002")); 
        
        // 허용할 HTTP 메서드 (GET, POST, 등)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // 허용할 HTTP 헤더
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        
        // 자격 증명(쿠키, 토큰 등)을 포함한 요청 허용
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 경로("/**")에 대해 위 CORS 정책 적용
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}