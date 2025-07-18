import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';


/* 로그인 상태에 따라 회원가입/로그인 버튼 또는 게시글 생성/로그아웃 버튼을 보여주며,
버튼 클릭 시 zustand 상태 변경이나 페이지 이동 같은 동작을 처리하는 내비게이션 바 역할
*/

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const openSignUpModal = useAuthStore(state => state.openSignUpModal);
  const openLoginModal = useAuthStore(state => state.openLoginModal);
  const setOpenLogoutModal = useAuthStore(state => state.setOpenLogoutModal);



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
            <button onClick={() => navigate('/posts/create')}>게시글 생성</button>
            <button onClick={() => setOpenLogoutModal(true)}>로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
