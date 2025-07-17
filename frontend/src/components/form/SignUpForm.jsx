import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

// 사용자 form 입력받는 -> 모달
const SignUpForm = () => {
  const formData = useAuthStore(state => state.formData);
  const setFormData = useAuthStore(state => state.setFormData);
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);
  const signUp = useAuthStore(state => state.signUp);
  const clearError = useAuthStore(state => state.clearError);

  const onChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email || ''}
        onChange={onChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password || ''}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={formData.nickname || ''}
        onChange={onChange}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
};

export default SignUpForm;
