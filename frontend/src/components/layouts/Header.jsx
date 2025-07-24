import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button'; // Button 컴포넌트 사용

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, openSignUpModal, openLoginModal, setOpenLogoutModal } = useAuthStore();

  // CSS-in-JS 스타일 정의
  const headerStyle = {
    padding: '16px 24px',
    backgroundColor: 'var(--toss-white)',
    borderBottom: '1px solid var(--toss-gray-light)',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    cursor: 'pointer',
  };

  const menuContainerStyle = {
    display: 'flex',
    gap: '16px',
  };

  const menuButtonStyle = {
    all: 'unset', // 모든 기본 스타일 초기화
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 12px'
  }

  const handleLogoutClick = () => setOpenLogoutModal(true);

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={logoStyle} onClick={() => navigate('/')}>
          MyBlog
        </div>
        <div style={menuContainerStyle}>
          <button style={menuButtonStyle} onClick={() => navigate('/posts')}>게시글</button>
          <button style={menuButtonStyle} onClick={() => navigate('/posts/create')}>글쓰기</button>
          
          {isLoggedIn ? (
            <button style={menuButtonStyle} onClick={handleLogoutClick}>로그아웃</button>
          ) : (
            <>
              <button style={menuButtonStyle} onClick={openLoginModal}>로그인</button>
              <Button onClick={openSignUpModal}>회원가입</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;