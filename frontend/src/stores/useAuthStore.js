import { create } from 'zustand';
import { authApi } from '../api/authApi';

export const useAuthStore = create((set, get) => ({
  // 1. 상태 (State)
  // 사용자 정보 및 인증 관련 상태 추가
  user: null,
  isAuthenticated: false,
  loading: false, // API 호출 시 로딩 상태
  error: null,    // API 호출 시 에러 메시지

  // 모달 상태 (기존과 동일)
  isSignUpModalOpen: false,
  isSignInModalOpen: false,

  // 폼 데이터 (기존과 동일)
  formData: {
    email: '',
    password: '',
    nickname: ''
  },

  // 2. 액션 (Actions)
  // 폼 데이터 업데이트 (기존과 동일)
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  // 에러 메시지 초기화 액션 추가
  clearError: () => set({ error: null }),

  // 모달 열기/닫기 (닫을 때 폼 데이터와 에러 초기화 로직 추가)
  openSignUpModal: () => set({ isSignUpModalOpen: true }),
  closeSignUpModal: () => set({ 
    isSignUpModalOpen: false, 
    error: null,
    formData: { email: '', password: '', nickname: '' }
  }),

  openSignInModal: () => set({ isSignInModalOpen: true }),
  closeSignInModal: () => set({ 
    isSignInModalOpen: false, 
    error: null,
    formData: { email: '', password: '', nickname: '' }
  }),

  // --- 실제 API 통신을 담당하는 핵심 액션들 ---

  // 회원가입 액션
  signup: async () => {
    const { formData } = get(); // 현재 폼 데이터를 가져옴
    
    set({ loading: true, error: null }); // 로딩 시작, 에러 초기화

    try {
      // API 호출
      await authApi.signup({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname
      });
      
      // 성공 시
      set({ 
        loading: false, 
        isSignUpModalOpen: false, // 모달 닫기
        formData: { email: '', password: '', nickname: '' } // 폼 비우기
      });
      
      alert('회원가입이 완료되었습니다!');

    } catch (error) {
      // 실패 시
      set({ 
        loading: false, 
        error: error.message || '회원가입에 실패했습니다.' 
      });
    }
  },

  // 로그인 액션
  signin: async () => {
    set({ loading: true, error: null });

    try {
      // API 호출
      const response = await authApi.signin({
        email: get().formData.email,
        password: get().formData.password
      });
      
      // 성공 시 토큰과 사용자 정보를 localStorage에 저장
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // 상태 업데이트
      set({ 
        loading: false,
        isAuthenticated: true,
        user: response.user,
        isSignInModalOpen: false, // 모달 닫기
        formData: { email: '', password: '', nickname: '' }
      });

    } catch (error) {
      // 실패 시
      set({ 
        loading: false, 
        error: error.message || '로그인에 실패했습니다.' 
      });
    }
  },

  // 로그아웃 액션
  signout: () => {
    // 로컬 스토리지 정리
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 상태 초기화
    set({ 
      isAuthenticated: false,
      user: null,
      formData: { email: '', password: '', nickname: '' }
    });
  },

  // 자동 로그인 (앱/새로고침 시작 시)
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      // 실제로는 여기서 토큰 유효성 검증 API를 한번 더 호출하는 것이 안전합니다.
      const user = JSON.parse(userStr);
      set({
        isAuthenticated: true,
        user: user
      });
    }
  }
}));