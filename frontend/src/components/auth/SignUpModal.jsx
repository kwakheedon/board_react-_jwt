import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import SignUpForm from '../form/SignUpForm';


//form데이터 받고 > 메인레이아웃
const SignUpModal = () => {
  const isSignUpModalOpen = useAuthStore(state => state.isSignUpModalOpen);
  const closeSignUpModal = useAuthStore(state => state.closeSignUpModal);

  if (!isSignUpModalOpen) return null;

  return (
    <div className="modal-background" onClick={closeSignUpModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>회원가입</h2>
        <SignUpForm />
        <button onClick={closeSignUpModal}>닫기</button>
      </div>
    </div>
  );
};

export default SignUpModal;