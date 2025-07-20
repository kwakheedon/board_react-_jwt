import { create } from 'zustand';
import { authApi } from '../api/authApi';

const initialFormData = {
  email: '',
  password: '',
  nickname: ''
};

export const useAuthStore = create((set, get) => ({
  // 상태
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,

  isSignUpModalOpen: false,
  isLoginModalOpen: false,
  openLogoutModal: false,



  formData: { ...initialFormData },

  // 액션
  setFormData: (data) => set(state => ({
    formData: { ...state.formData, ...data }
  })),

  clearError: () => set({ error: null }),

  openSignUpModal: () => set({ isSignUpModalOpen: true }),
  closeSignUpModal: () => set({
    isSignUpModalOpen: false,
    error: null,
    formData: { ...initialFormData }
  }),

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({
    isLoginModalOpen: false,
    error: null,
    formData: { ...initialFormData }
  }),

  setOpenLogoutModal: (val) => set({ openLogoutModal: val }),
  
 

  signup: async () => {
    const { formData } = get();
    set({ loading: true, error: null });

    try {
      await authApi.signup({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname
      });
      set({
        loading: false,
        isSignUpModalOpen: false,
        formData: { ...initialFormData }
      });
      console.log('회원가입이 완료되었습니다!');
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message || '회원가입에 실패했습니다.'
      });
    }
  },

  login: async () => {
    const { formData } = get();
    set({ loading: true, error: null });

    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password
      });
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({
        loading: false,
        isLoggedIn: true,
        isLoginModalOpen: false,
        formData: { ...initialFormData }
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message || '로그인에 실패했습니다.'
      });
    }
  },


  
  logout: async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    if (refreshToken) {
      await authApi.logout(refreshToken); 
    }
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
  } finally {
    
    //  클라이언트 상태 정리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    set({
      isLoggedIn: false,
      user: null,
      formData: { ...initialFormData } 
    });
  }
},

  
  initializeAuth: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // 여기서 토큰 검증 API 호출 권장
      set({ isLoggedIn: true });
    }
  }
}));