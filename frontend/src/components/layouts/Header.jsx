import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openSignUpModal = useAuthStore((state) => state.openSignUpModal);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const logout = useAuthStore((state) => state.logout);

  const goToCreatePost = () => {
    navigate('/posts/create');  // 게시글 생성 페이지 경로 예시
  };

  return (
    <header>
      <nav>
        {!isLoggedIn ? (
          <>
            <button onClick={openSignUpModal}>회원가입</button>
            <button onClick={openLoginModal}>로그인</button>
          </>
        ) : (
          <>
            <button onClick={goToCreatePost}>게시글 생성</button>
            <button onClick={logout}>로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
