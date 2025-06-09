export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hours === 0) {
    return `${mins}분`;
  }
  return `${hours}시간 ${mins}분`;
};
