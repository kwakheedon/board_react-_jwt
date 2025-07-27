import React from 'react';
import SignUpModal from './SignUpModal'; 
import { useAuthStore } from '../../stores/useAuthStore';


const SignUpForm = () => {

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


  const onChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup();
  };

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
