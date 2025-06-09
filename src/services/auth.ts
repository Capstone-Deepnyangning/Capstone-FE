import {LoginRequest, SignUpRequest} from '@/types/auth';
import {instance} from './axios';
import axios from 'axios';

export const signUp = async (body: SignUpRequest) => {
  try {
    const {data} = await instance.post('/auth/signup', body);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
    throw error;
  }
};

export const login = async (body: LoginRequest) => {
  try {
    const {data} = await instance.post('/auth/login', body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await instance.post('/auth/logout');
  } catch (error) {
    throw error;
  }
};

export const reissueToken = async (refreshToken: string) => {
  try {
    const {data} = await instance.post('/auth/reissue', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
