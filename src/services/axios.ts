import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {reissueToken} from './auth';

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
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
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
    return Promise.reject(error);
  },
);

export default instance;
