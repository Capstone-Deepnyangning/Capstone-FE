import {instance} from './axios';

export const postFaceAccess = async (data: {identifier: string; accessType: 'EXIT' | 'ENTRY'; similarity: number}) => {
  const response = await instance.post('/api/access/face', data);
  return response.data;
};
