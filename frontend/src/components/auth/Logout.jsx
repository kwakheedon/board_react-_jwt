import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const Logout = () => {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    logout,
    openLogoutModal,
    setOpenLogoutModal
  } = useAuthStore();

  // 모달 안의 "확인" 버튼 핸들러
  const handleLogout = async () => {
    await logout(); // 로그아웃 실행
    setOpenLogoutModal(false); // 모달 닫기
    navigate('/'); // 홈으로 이동
  };

  // 모달이 닫혀 있거나 로그인 상태가 아니면 아무것도 렌더링하지 않음
  if (!openLogoutModal || !isLoggedIn) return null;

  return (
    <div className="modal">
      <h2>정말 로그아웃 하시겠습니까?</h2>
      <button onClick={handleLogout}>확인</button>
      <button onClick={() => setOpenLogoutModal(false)}>취소</button>
    </div>
  );
};

export default Logout;