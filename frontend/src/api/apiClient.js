
import axios from 'axios';

//백엔드 API 서버와 통신할 때 인증 토큰 자동 관리 + 재발급 처리까지 한방에 해주는 axios 인스턴스를 만드는 것
const apiClient = axios.create({
  baseURL: 'http://localhost:8089/api/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터:  axios 요청하기전에 (로컬)유저에 토큰이 있는지 확인하는
// axios 요청 시 사용된 설정 객체 (URL, method, headers 등)
// error.config	에러가 난 요청의 config, 재요청 등에 활용
apiClient.interceptors.request.use(
  (config) => {
    const Token = localStorage.getItem('accessToken'); //클라이언트 로컬스토리지에서 Access Token 읽음
    if (Token) {
      config.headers.Authorization = `Bearer ${Token}`; // 요청 헤더에 붙임
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 'Access Token의 만료'를 감지하고, 자동으로 Refresh Token을 통해 새 토큰을 발급
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
            localStorage.removeItem('accessToken');  // 소문자 'accessToken' 으로 통일
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/'; // 로그인 페이지로 이동
            return Promise.reject(error);
        }

        // 백엔드의 /api/reissue 엔드포인트로 토큰 재발급 요청
        const response = await axios.post('http://localhost:8089/api/api/reissue', { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새로 발급받은 토큰들을 localStorage에 저장 (소문자 key로 통일)
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 실패했던 원래 요청의 헤더에 새로운 Access Token을 설정합니다.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청을 다시 시도합니다.
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');  // 소문자 'accessToken' 으로 통일
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;