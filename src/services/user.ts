import {instance} from './axios';

export const getUser = async () => {
  const {data} = await instance.get('/api/users');
  return data;
};

export const deleteUser = async () => {
  const {data} = await instance.delete('/api/users');
  return data;
};

export const resetPassword = async (body: {currentPassword: string; newPassword: string}) => {
  try {
    console.log(body);
    const {data} = await instance.post('/api/users/password', body);
    return data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
