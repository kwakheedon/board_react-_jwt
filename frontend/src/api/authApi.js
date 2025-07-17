import apiClient from './apiClient';
// 연동 방식 흐름
// React 컴포넌트 → authApi.js의 함수 호출 → apiClient.js가 요청 가로채서 헤더 추가 → 백엔드 서버
// 만약 토큰이 만료되었다면,
// 백엔드 서버 (401 에러 응답) → apiClient.js가 응답 가로채서 토큰 재발급 시도 → 성공 시, 원래 요청 재전송 → React 컴포넌트는 성공 결과 받음

export const authApi = {
/**
   * 회원가입 API
   * @param {object} userData - { email, password, nickname } 등 회원가입에 필요한 정보
   */
signup: async (userData) => {
    try {
    const response = await apiClient.post('/signup', userData);
    return response.data;
    } catch (error) {
    throw error.response?.data || { message: '회원가입에 실패했습니다.' };
    }
},

/**
   * 로그인 API
   * @param {object} credentials - { email, password }
   */
  login: async (credentials) => {
    try {
      // signIn -> login으로 함수명 변경 및 경로 수정
      const response = await apiClient.post('/login', credentials);
      // 성공 시 response.data 안에는 { success, message, data: { accessToken, refreshToken } }이 들어있습니다.
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '로그인에 실패했습니다.' };
    }
  },

  /**
   * 로그아웃 API
   * @param {string} refreshToken - 로그아웃 처리를 위해 서버에 보낼 리프레시 토큰
   */
  logout: async (refreshToken) => {
    try {
      // signOut -> logout으로 함수명 변경 및 경로 수정
      // 백엔드에서 { "refreshToken": "..." } 형태의 body를 요구하므로 객체로 감싸서 보냅니다.
      await apiClient.post('/logout', { refreshToken });
    } catch (error) {
      // 로그아웃은 실패하더라도 클라이언트 측에서는 토큰 삭제 등 로그아웃 처리를 계속 진행할 수 있습니다.
      console.error('로그아웃 API 호출에 실패했습니다:', error);
    }
  },
};
