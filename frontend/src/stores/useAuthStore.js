import { create } from 'zustand';
import { signup as signupApi, login as loginApi, logout as logoutApi } from '../api/authApi';

const initialFormData = {
  email: '',
  password: '',
  nickname: ''
};

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  isSignUpModalOpen: false,
  isLoginModalOpen: false,
  openLogoutModal: false,
  authInitialized: false,
  formData: { ...initialFormData },

  setFormData: (data) => set(state => ({ formData: { ...state.formData, ...data } })),
  clearError: () => set({ error: null }),
  openSignUpModal: () => set({ isSignUpModalOpen: true, isLoginModalOpen: false, error: null, formData: { ...initialFormData } }),
  openLoginModal: () => set({ isLoginModalOpen: true, isSignUpModalOpen: false, error: null, formData: { ...initialFormData } }),
  closeSignUpModal: () => set({ isSignUpModalOpen: false, error: null, formData: { ...initialFormData } }),
  closeLoginModal: () => set({ isLoginModalOpen: false, error: null, formData: { ...initialFormData } }),
  setOpenLogoutModal: (val) => set({ openLogoutModal: val }),

  signup: async () => {
    const { formData } = get();
    set({ loading: true, error: null });
    try {
      await signupApi({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      });
      set({ loading: false, isSignUpModalOpen: false, formData: { ...initialFormData } });
      console.log('회원가입이 완료되었습니다!');
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || error.message || '회원가입에 실패했습니다.' });
    }
  },

 login: async () => {
    const { formData } = get();
    set({ loading: true, error: null });
    try {
      const apiResponse = await loginApi({ email: formData.email, password: formData.password });


      const { accessToken, userId, nickname, email } = apiResponse.data;
      
      const user = { userId, nickname, email };
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      set({ loading: false, isLoggedIn: true, isLoginModalOpen: false, user: user, formData: { ...initialFormData } });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || '로그인 실패';
      set({ loading: false, error: errorMessage });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      set({ isLoggedIn: false, user: null, formData: { ...initialFormData } });
    }
  },

  initializeAuth: () => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        set({ isLoggedIn: true, user: JSON.parse(storedUser) });
      } catch (e) {
        localStorage.clear();
        set({ isLoggedIn: false, user: null });
      }
    } else {
      set({ isLoggedIn: false, user: null });
    }
    set({ authInitialized: true });
  }
}));

