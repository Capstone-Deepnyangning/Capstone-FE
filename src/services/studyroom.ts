import {ReservationStudyRoomParams} from '@/types/studyroom';
import {instance} from './axios';

export const getStudyRooms = async (params: {date: string; startTime?: string; endTime?: string; size?: number}) => {
  try {
    const {data} = await instance.get(`/api/studyrooms`, {params});
    return data;
  } catch (error) {
    throw error;
  }
};

export const reserveStudyRoom = async (body: ReservationStudyRoomParams) => {
  try {
    const {data} = await instance.post(`/api/studyrooms/reservations`, body);
    return data;
  } catch (error) {
    throw error.response;
  }
};

export const getMyReservations = async () => {
  try {
    const {data} = await instance.get(`/api/studyrooms/reservations/my`);
    return data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const getStudyRoomDetail = async (id: string) => {
  try {
    const {data} = await instance.get(`/api/studyrooms/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteReservation = async (id: string) => {
  try {
    const {data} = await instance.delete(`/api/studyrooms/reservations/${id}`);
    return data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const getAvailableTime = async (params: {studyRoomId: string; date: string}) => {
  try {
    const {data} = await instance.get(`/api/studyrooms/reservations/available-time`, {params});
    return data;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

export const addParticipant = async (body: {identifier: string; date: string; name: string}) => {
  const {data} = await instance.post(`/api/studyrooms/participants`, body);
  return data;
};

export const putReservation = async (body: ReservationStudyRoomParams, reservationId: string) => {
  const {data} = await instance.put(`/api/studyrooms/reservations/${reservationId}`, body);
  return data;
};
