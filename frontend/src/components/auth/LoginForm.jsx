import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import LoginModal from './LoginModal';

const LoginForm = () => {
  // 1. 로그인 기능에 필요한 모든 상태와 함수를 가져옵니다.
  //    모달을 여닫는 상태(isSignInModalOpen)까지 모두 가져오는 것이 핵심입니다.
  const {
    isLoginModalOpen,
    closeLoginModal,
    formData,             // 폼 데이터 (email, password)
    setFormData,          // 폼 데이터 업데이트 함수
    login,                // 로그인 API 호출 함수 ← 핵심!
    loading,              // 로딩 상태
    error,                // 에러 메시지
    clearError            // 에러 초기화
  } = useAuthStore();

  // 2. 이벤트 핸들러(로직)는 그대로 유지합니다.
  const onChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  // 3. UI와 합쳐진 Modal 컴포넌트에게 필요한 모든 것을 전달합니다.
  return (
    <LoginModal  
      isOpen={isLoginModalOpen}
      onClose={closeLoginModal}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default LoginForm;