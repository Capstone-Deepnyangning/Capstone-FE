import instance from './axios';

export const generateQRCode = async () => {
  const response = await instance.post('/api/qr/generate');
  return response.data;
};
