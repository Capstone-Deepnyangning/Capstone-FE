import instance from './axios';

export const getCongestion = async () => {
  try {
    const response = await instance.get('/api/congestion');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
