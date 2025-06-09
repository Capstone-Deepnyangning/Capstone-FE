import instance from './axios';

export const reportFaceError = async () => {
  try {
    const response = await instance.post('/api/reports');
    console.log('res', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error.response);
  }
};
