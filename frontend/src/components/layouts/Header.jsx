import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openSignUpModal = useAuthStore((state) => state.openSignUpModal);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const setOpenLogoutModal = useAuthStore((state) => state.setOpenLogoutModal);

  // 함수 선언 위치가 중요! 컴포넌트 내부에 선언해야 함
  const goToCreatePost = () => {
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
            <button onClick={openSignUpModal}>회원가입</button>
            <button onClick={openLoginModal}>로그인</button>
          </>
        ) : (
          <>
            <button onClick={goToCreatePost}>게시글 생성</button>
            <button onClick={handleLogoutClick}>로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
