import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

const LoginModal = () => {
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal);
  const login = useAuthStore((state) => state.login);

  const onLogin = () => {
    login();             // 로그인 상태 true 변경
    closeLoginModal();   // 모달 닫기
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal-background" onClick={closeLoginModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>로그인 모달</h2>
        {/* 로그인 폼 컴포넌트나 내용 삽입 */}
        <button onClick={onLogin}>로그인 완료</button>
        <button onClick={closeLoginModal}>닫기</button>
      </div>
    </div>
  );
};

export default LoginModal;
