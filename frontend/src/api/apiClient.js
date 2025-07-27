import axios from 'axios';

const API_BASE_URL = 'http://localhost:8089/api/api';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // 모든 요청에 쿠키를 포함
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
    const response = await axios.post(`${API_BASE_URL}/reissue`, 
      {}, // 서버로 빈 객체를 보냄
      { withCredentials: true } //재발급 요청에도 쿠키를 포함
    );

    const {
      accessToken: newAccessToken,
    } = response.data.data;

 localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);

    if (error.response && error.response.status === 401) {
      console.log('Refresh token invalid, logging out.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/'; 
    }
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
          //  분리된 함수를 호출하여 재발급 로직 간소화
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
          // 응답 인터셉터에서도 동일한 함수를 호출
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