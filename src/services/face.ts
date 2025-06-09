import axios from 'axios';
import instance from './axios';
import {VideoFile} from 'react-native-vision-camera';
import {useUserStore} from '@/store/useUserStore';
import {Platform} from 'react-native';

export const registerFace = async (videoFile: VideoFile) => {
  const identifier = useUserStore.getState().identifier;
  const accessToken = useUserStore.getState().accessToken;

  const formData = new FormData();
  formData.append('file', {
    uri: Platform.OS === 'android' ? `file://${videoFile.path}` : videoFile.path,
    type: 'video/mp4',
    name: 'face_video.mp4',
  } as any);
  formData.append('identifier', identifier);

  try {
    const response = await instance.post('/api/faces', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Face registration error:', error);
    throw error;
  }
};

export const deleteFace = async () => {
  try {
    const formData = new FormData();
    formData.append('identifier', useUserStore.getState().identifier);
    formData.append('remove_folder', 'true');

    const response = await axios.post('https://efba-116-44-51-91.ngrok-free.app/delete_face', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',

        Authorization: `Bearer ${useUserStore.getState().accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error.response);
  }
};
