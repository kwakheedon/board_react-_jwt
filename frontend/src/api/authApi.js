import apiClient from './apiClient';
import axios from 'axios';
// 연동 방식 흐름
// React 컴포넌트 → authApi.js의 함수 호출 → apiClient.js가 요청 가로채서 헤더 추가 → 백엔드 서버
// 만약 토큰이 만료되었다면,
// 백엔드 서버 (401 에러 응답) → apiClient.js가 응답 가로채서 토큰 재발급 시도 → 성공 시, 원래 요청 재전송 → React 컴포넌트는 성공 결과 받음

export const authApi = {

//회원가입API
signup: async (userData) => {
    try {
    const response = await apiClient.post('/signup', userData);
    return response.data;
    } catch (error) {
    throw error.response?.data || { message: '회원가입에 실패했습니다.' };
    }
},

//로그인 API 
  login: async (credentials) => {
    try {
      // 건 마다 불필요하게 주소를 연결하지 않고 미리 연결해둔 apiClient를 호출해서 사용
      // 요청을 받고 처리한 결과가 담긴 HTTP 응답 전체 객체 (credentials)가 response에 들어감
      const response = await apiClient.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: '로그인에 실패했습니다.' };
    }
  },


//로그아웃API
logout: async (refreshToken) => {
  try { // apiClient를 호출해서 사용하지않고  기본 axios 사용 
    await axios.post('http://localhost:8089/api/api/logout', { refreshToken }); 
  } catch (error) {
    console.error('로그아웃 API 호출에 실패했습니다:', error);
  }
}



}