import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openSignUpModal = useAuthStore((state) => state.openSignUpModal);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const setOpenLogoutModal = useAuthStore((state) => state.setOpenLogoutModal);

  // 홈으로 이동
  const goToHome = () => {
    navigate('/');
  };

  // 게시글 목록으로 이동
  const goToPostList = () => {
    navigate('/posts');
  };

  // 게시글 생성 - 로그인 검증
  const goToCreatePost = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }
    navigate('/posts/create');
  };

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  return (
    <header>
      <nav>
        {!isLoggedIn ? (
          <>
            <button onClick={goToHome}>홈</button>
            <button onClick={goToPostList}>게시글</button>
            <button onClick={goToCreatePost}>글쓰기</button>
            <button onClick={openSignUpModal}>회원가입</button>
            <button onClick={openLoginModal}>로그인</button>
          </>
        ) : (
          <>
            <button onClick={goToHome}>홈</button>
            <button onClick={goToPostList}>게시글</button>
            <button onClick={goToCreatePost}>글쓰기</button>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;