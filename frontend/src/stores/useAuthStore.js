import { create } from 'zustand';


export const useAuthStore = create((set) => ({
  //“사용자 관련 상태와 그 상태를 바꾸는 함수들을 한곳에 모아놓은 곳”
  isLoggedIn: false,
  isSignUpModalOpen: false,
  isLoginModalOpen: false,

  formData: {
    email: '',
    password: '',
    nickname: '',
  },

  openSignUpModal: () => set({ isSignUpModalOpen: true }),
  closeSignUpModal: () => set({ isSignUpModalOpen: false }),

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

  setFormData: (newData) => set((state) => ({
    formData: { ...state.formData, ...newData }
  })),
}));
