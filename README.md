# 🛡️ board-react-jwt

JWT 인증 기반으로 게시판/댓글/대댓글 기능을 구현한 개인 프로젝트입니다.  
Spring Boot + React.js 환경에서 사용자 인증, 게시글 관리, 댓글 트리 구조까지  
**실무 흐름에 가까운 구조와 인증 보안 로직**을 직접 구현했습니다.

---

## 📌 프로젝트 개요

- 🔧 **개발 기간**: 2025.07.08 ~ 2025.07.25
- 🧑‍💻 **개발 인원**: 1인 (개인 프로젝트)
- 🗂 **주요 기능**: 로그인/회원가입, 게시글 CRUD, 댓글/대댓글 작성 및 삭제, 권한 체크, 상태관리, UX 보완
- 🔐 **인증 방식**: JWT (Access + Refresh 토큰), Axios 인터셉터, 토큰 재발급

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| **Backend** | Java 17, Spring Boot, Spring Security (JWT), JPA, MySQL |
| **Frontend** | React.js, Vite, Zustand, Axios, Framer Motion |
| **DevOps / 기타** | Postman, Git & GitHub, HttpOnly 쿠키, localStorage |

---
## 📐 ERD (Entity Relationship Diagram)
> 아래는 프로젝트의 DB 테이블 구조를 나타낸 ERD입니다.
![ERD](./assets/erd.png)


## ✨ 핵심 기능

### 🔐 인증 / 보안

- JWT 로그인 및 로그아웃
- RefreshToken 통한 자동 토큰 재발급
- Axios 인터셉터로 JWT 자동 포함 및 에러 캐치
- 비로그인 사용자의 접근 시 alert + 리다이렉트 처리

### 📝 게시글

- 게시글 생성/수정/삭제 (작성자 본인만 가능)
- 최신 게시글 5개 슬라이드 형태로 출력 (Swiper.js 사용)
- 전체 게시글 목록 조회 (Framer Motion 애니메이션 적용)

### 💬 댓글/대댓글

- 댓글/대댓글 트리 구조 저장 및 출력
- 댓글 본인만 삭제 가능
- 댓글은 CommentList → CommentItem 구조로 재귀 렌더링

---

## 🖼️ 주요 화면

### ✅ 메인화면 / 로그인 / 글쓰기

| 메인화면 | 로그인 모달 | 글쓰기 |
|----------|-------------|--------|
| ![main](https://github.com/user-attachments/assets/b181cfa4-1691-4886-8da6-0d7f803d2e1c) | ![login](https://github.com/user-attachments/assets/128565c6-629b-47b2-a03a-87598033d608) | ![create](https://github.com/user-attachments/assets/c5c67980-63b8-4696-96ca-2891c3b5a3d0) |

---

### ✅ 댓글 트리 / 대댓글 / 글 수정

| 댓글 트리 |  본인 글 수정/삭제 |
|-----------|------------------|
| ![tree](https://github.com/user-attachments/assets/9fe5d7c3-8718-460f-a47e-6fb717f9e55a) | ![reply](https://github.com/user-attachments/assets/0b3f13db-9854-4eb2-ac90-6351f257c3f1) 

---

## 🧪 API 테스트 (Postman)

### ✅ 로그인
- POST `/api/login`  
- 응답: AccessToken (본문), RefreshToken (HttpOnly 쿠키)

![postman-login](https://github.com/user-attachments/assets/09de2845-339b-4cd9-8a3a-de7bf39cb198)

---

### ✅ 토큰 재발급
- POST `/api/reissue`  
- 조건: AccessToken 만료 + RefreshToken 유지  
- 응답: 새로운 AccessToken + 새로운 RefreshToken

![postman-reissue](https://github.com/user-attachments/assets/251f2586-28e1-4a1a-ae2b-3526a9dda510)

## 🧩 Troubleshooting

### 1. posts.map is not a function

- 🔍 **원인**: API 응답 전체(res.data)를 상태에 저장하여 posts가 배열이 아닌 객체가 됨
- ✅ **해결**: `setPosts(res.data.data)`로 배열만 추출하여 map 함수 사용 가능하게 처리

---

### 2. 대댓글(children)이 렌더링되지 않음

- 🔍 **원인**: 백엔드에서 `children` 필드가 null로 내려와 `.map()`이 실행되지 않음
- ✅ **해결**: `Comment` 엔티티에서 `children = new ArrayList<>()`로 초기화하여 null 방지 → 트리 렌더링 성공
