
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8089/api/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청 헤더에 Access Token을 자동으로 추가합니다.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Access Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ⭐ 응답 인터셉터: 토큰 만료(401) 시 자동으로 재발급을 시도합니다.
apiClient.interceptors.response.use(
  (response) => {
    // 2xx 상태 코드를 가진 응답은 그대로 반환합니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도를 하지 않은 경우에만 토큰 재발급을 시도합니다.
    // originalRequest._retry 플래그는 무한 재발급 요청을 방지하기 위함입니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            // refreshToken이 없으면 바로 로그아웃 처리
            console.log("No refresh token, logging out.");
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/'; // 로그인 페이지로 이동
            return Promise.reject(error);
        }

        // 백엔드의 /api/reissue 엔드포인트로 토큰 재발급 요청
        // MemberController의 reissue 메서드와 통신합니다.
        const response = await axios.post('http://localhost:8089/api/api/reissue', { refreshToken });

        // 백엔드 응답 형식에 따라 새로운 토큰을 추출합니다.
        // { success: true, message: "...", data: { accessToken: "...", refreshToken: "..." } }
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새로 발급받은 토큰들을 localStorage에 저장합니다.
        localStorage.setItem('token', newAccessToken);
        if (newRefreshToken) { // 서버가 새로운 리프레시 토큰을 주면 갱신
            localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 실패했던 원래 요청의 헤더에 새로운 Access Token을 설정합니다.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청을 다시 시도합니다.
        return apiClient(originalRequest);

      } catch (refreshError) {
        // 토큰 재발급 실패 시 (e.g., Refresh Token도 만료됨)
        console.error('Token refresh failed:', refreshError);
        // 모든 토큰과 유저 정보를 삭제하고 로그아웃 처리합니다.
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    // 401 에러가 아니거나, 재시도 플래그가 이미 설정된 경우는 에러를 그대로 반환합니다.
    return Promise.reject(error);
  }
);

export default apiClient;
