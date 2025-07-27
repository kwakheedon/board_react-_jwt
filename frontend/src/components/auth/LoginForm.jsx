import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import LoginModal from './LoginModal';

const LoginForm = () => {
 
  const {
    isLoginModalOpen,
    closeLoginModal,
    formData,             
    setFormData,          
    login,                
    loading,             
    error,                
    clearError           
  } = useAuthStore();

  const onChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };


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