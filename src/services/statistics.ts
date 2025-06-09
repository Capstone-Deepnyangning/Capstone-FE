import instance from './axios';

export const getStatistics = async () => {
  try {
    const response = await instance.get('/api/access/statistics');
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getMonthlyStatistics = async ({year, month}: {year: string; month: string}) => {
  try {
    const response = await instance.get(`/api/access/statistics/monthly?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};
