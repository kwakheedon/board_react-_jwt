import axios from 'axios';

const API_BASE_URL = 'http://localhost:8089/api/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT 만료 여부 확인 함수
const isTokenExpired = (jwtToken) => {
  if (!jwtToken) return true;
  try {
    const payload = JSON.parse(atob(jwtToken.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
};


async function getNewToken() {
  try {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      throw new Error('No refresh token available.');
    }

    const response = await axios.post(`${API_BASE_URL}/reissue`, {
      refreshToken: storedRefreshToken,
    });

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    } = response.data.data;

    localStorage.setItem('accessToken', newAccessToken);
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);

    // 토큰 갱신이 401 에러로 실패한 경우,
    // 이 때만 클라이언트 측에서 로그아웃 처리를 하고 페이지를 새로고침
    if (error.response && error.response.status === 401) {
      console.log('Refresh token invalid, logging out.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/'; // 로그인 페이지로 이동
    }

    // 다른 종류의 에러(서버 500 에러, 네트워크 문제 등)는
    // 즉시 로그아웃 처리하지 않고 에러를 그대로 반환
    return Promise.reject(error);
  }
}



// 중복 요청 방지 상태 관리
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  refreshQueue = [];
};

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    let currentAccessToken = localStorage.getItem('accessToken');

    if (currentAccessToken && isTokenExpired(currentAccessToken)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          //  2. 분리된 함수를 호출하여 재발급 로직 간소화
          const newAccessToken = await getNewToken();
          processQueue(null, newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return config;
        } catch (error) {
          processQueue(error, null);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      // 토큰 갱신 중이면 요청을 대기열에 추가
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          },
          reject: (error) => {
            reject(error);
          },
        });
      });
    }

    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          //  3. 응답 인터셉터에서도 동일한 함수를 호출
          const newAccessToken = await getNewToken();
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 토큰 갱신 중이면 요청을 대기열에 추가
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject: (err) => {
            reject(err);
          },
        });
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;