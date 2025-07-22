
import axios from 'axios';

//백엔드 API 서버와 통신할 때 인증 토큰 자동 관리 + 재발급 처리까지 한방에 해주는 axios 인스턴스를 만드는 것
const apiClient = axios.create({
  baseURL: 'http://localhost:8089/api/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//  JWT 만료 여부 확인 함수
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

// 중복 요청 방지 상태 관리
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, newAccessToken = null) => {
  refreshQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(newAccessToken);
    }
  });
  refreshQueue = [];
};


// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    const currentAccessToken = localStorage.getItem('accessToken');

    // access token이 만료된 경우 → 선요청이 아니라면 대기열 등록
    if (currentAccessToken && isTokenExpired(currentAccessToken)) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const storedRefreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://localhost:8089/api/api/reissue', {
            refreshToken: storedRefreshToken,
          });

          const {
            accessToken: refreshedAccessToken,
            refreshToken: refreshedRefreshToken,
          } = response.data.data;

          localStorage.setItem('accessToken', refreshedAccessToken);
          if (refreshedRefreshToken) {
            localStorage.setItem('refreshToken', refreshedRefreshToken);
          }

          processQueue(null, refreshedAccessToken);
          config.headers.Authorization = `Bearer ${refreshedAccessToken}`;
          return config;
        } catch (err) {
          processQueue(err, null);
          localStorage.clear();
          window.location.href = '/';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      //  갱신 중이면 대기열에 추가
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (newToken) => {
            config.headers.Authorization = `Bearer ${newToken}`;
            resolve(config);
          },
          reject: (err) => reject(err),
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

//  응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) {
          console.log("No refresh token. Logging out.");
          localStorage.clear();
          window.location.href = '/';
          return Promise.reject(error);
        }

        const response = await axios.post('http://localhost:8089/api/api/reissue', {
          refreshToken: storedRefreshToken,
        });

        const {
          accessToken: refreshedAccessToken,
          refreshToken: refreshedRefreshToken,
        } = response.data.data;

        localStorage.setItem('accessToken', refreshedAccessToken);
        if (refreshedRefreshToken) {
          localStorage.setItem('refreshToken', refreshedRefreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${refreshedAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;