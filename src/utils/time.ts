export const formatStayTime = (minutes: number): string => {
  if (!minutes) return '0분';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}분`;
  }

  return `${hours}시간 ${remainingMinutes > 0 ? `${remainingMinutes}분` : ''}`;
};
