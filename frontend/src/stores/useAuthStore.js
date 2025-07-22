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
  isLoggedIn: null,
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

  //모달열기
  openSignUpModal: () =>
    set({
      isSignUpModalOpen: true,
      isLoginModalOpen: false,
      error: null,
      formData: { ...initialFormData },
    }),

    openLoginModal: () =>
    set({
      isLoginModalOpen: true,
      isSignUpModalOpen: false,
      error: null,
      formData: { ...initialFormData },
    }),

  // 모달닫기
  closeSignUpModal: () =>
    set({
      isSignUpModalOpen: false,
      error: null,
      formData: { ...initialFormData },
    }),

  closeLoginModal: () =>
    set({
      isLoginModalOpen: false,
      error: null,
      formData: { ...initialFormData },
    }),
  setOpenLogoutModal: (val) => set({ openLogoutModal: val }),
  

// 회원가입
  signup: async () => {
    const { formData } = get();
    set({ loading: true, error: null });

    try {
      await authApi.signup({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      });
      set({
        loading: false,
        isSignUpModalOpen: false,
        formData: { ...initialFormData },
      });
      console.log('회원가입이 완료되었습니다!');
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          '회원가입에 실패했습니다.',
      });
    }
  },

  // 로그인
  login: async () => {
    const { formData } = get();
    set({ loading: true, error: null });

    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
       console.log('login response.data:', response.data);  // 여기서 확인
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({
        loading: false,
        isLoggedIn: true,
        isLoginModalOpen: false,
        user: response.data.user,
        formData: { ...initialFormData },
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          '로그인에 실패했습니다.',
      });
    }
  },

  // 로그아웃
  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      set({
        isLoggedIn: false,
        user: null,
        formData: { ...initialFormData },
      });
    }
  },


  
  // 인증 초기화
initializeAuth: async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      await authApi.verifyToken(token);
      set({ isLoggedIn: true, accessToken: token, loading: false });
      return true; 
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({
        isLoggedIn: false,
        accessToken: null,
        loading: false,
        error: error.response?.data?.message || error.message || '인증 실패',
      });
      return false; 
    }
  } else {
    set({ isLoggedIn: false, accessToken: null, loading: false });
    return false;
  }
}

}));