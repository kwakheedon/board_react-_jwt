import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, openSignUpModal, openLoginModal, setOpenLogoutModal } = useAuthStore();

  const handleLogoutClick = () => setOpenLogoutModal(true);

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-logo" onClick={() => navigate('/')}>
          MyBlog
        </div>
        <div className="header-menu">
          <Button onClick={() => navigate('/posts')} className="toss-button-tertiary">게시글</Button>
          <Button onClick={() => navigate('/posts/create')} className="toss-button-tertiary">글쓰기</Button>
          
          {isLoggedIn ? (
            <Button onClick={handleLogoutClick} className="toss-button-tertiary">로그아웃</Button>
          ) : (
            <>
              <Button onClick={openLoginModal} className="toss-button-tertiary">로그인</Button>
              <Button onClick={openSignUpModal}>회원가입</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;