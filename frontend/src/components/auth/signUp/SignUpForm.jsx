import React from 'react';
import SignUpModal from './SignUpModal'; 
import { useAuthStore } from '../../../stores/useAuthStore';


const SignUpForm = () => {
  // 1. 회원가입 기능에 필요한 모든 상태와 함수를 가져옵니다.
  //    모달을 여닫는 상태(isSignUpModalOpen)까지 모두 가져오는 것이 핵심입니다.
  const {
    isSignUpModalOpen,
    closeSignUpModal,
    formData,
    setFormData,
    signup,
    loading,
    error,
    clearError
  } = useAuthStore();

  // 2. 이벤트 핸들러(로직)는 그대로 유지합니다.
  const onChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  // 3. UI와 합쳐진 Modal 컴포넌트에게 필요한 모든 것을 전달합니다.
  return (
    <SignUpModal
      isOpen={isSignUpModalOpen}
      onClose={closeSignUpModal}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default SignUpForm;
