import instance from './axios';

export const getEntryLogs = async (body: {startTime?: string; endTime?: string; identifier?: string; name?: string; authMethod?: string; page: number; size: number}) => {
  try {
    console.log(body);
    const response = await instance.get(`/api/admin/logs`, {params: body});
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getEntryFailLogs = async (body: {
  startTime?: string;
  endTime?: string;
  authMethod?: string;
  page: number;
  size: number;
  identifier?: string;
  name?: string;
}) => {
  try {
    const response = await instance.get(`/api/admin/logs/failure`, {params: body});
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getDetilEntryLog = async (id: string) => {
  try {
    const response = await instance.get(`/api/admin/logs/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getStudyRoomLogs = async (body: {name?: string; page?: number; size?: number}) => {
  try {
    const response = await instance.get(`/api/admin/studyrooms/reservations`, {params: body});
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getStudyRoomDetail = async (id: string) => {
  try {
    const response = await instance.get(`/api/studyrooms/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};
export const getReportedError = async (body: {page?: number; size?: number}) => {
  try {
    const response = await instance.get(`/api/admin/reports`, {params: body});
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const getReportedErrorDetail = async (reportId: string) => {
  try {
    const response = await instance.get(`/api/admin/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export const putReservationStatus = async (id: string, status: 'CONFIRMED' | 'CANCELED' | 'COMPLETED') => {
  try {
    const response = await instance.put(`/api/admin/studyrooms/reservations/${id}`, {status});
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};
