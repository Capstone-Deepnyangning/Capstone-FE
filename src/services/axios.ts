import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {reissueToken} from './auth';
import {storage} from '@/utils/mmkv';

export const instance = axios.create({
  baseURL: 'http://13.125.140.66:8080',
  timeout: 100000, // 5초 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전 수행할 작업
    console.log(config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getString('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // 토큰 재발급 요청
        const {result} = await reissueToken(refreshToken);
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} = result;

        // 새로운 토큰 저장
        storage.set('accessToken', newAccessToken);
        storage.set('refreshToken', newRefreshToken);

        // axios 헤더 업데이트
        setAuthToken(newAccessToken);

        // 실패한 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패 시 로그아웃 처리
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
