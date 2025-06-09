import {instance} from './axios';

export const postFCMToken = async (token: string) => {
  try {
    const response = await instance.post('/api/notifications/tokens', {token});
    console.log('asdf', response);
    return response.data;
  } catch (error) {
    console.log('asf', error.response);
  }
};
