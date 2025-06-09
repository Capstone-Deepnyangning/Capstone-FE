import {useState} from 'react';
import moment from 'moment';
import {getStudyRooms} from '@/services/studyRoom';

interface TimeRange {
  startTime: Date | null;
  endTime: Date | null;
}

interface StudyRoom {
  // Add study room properties here based on your API response
  [key: string]: any;
}

interface UseStudyRoomApiReturn {
  studyRooms: StudyRoom[];
  isLoading: boolean;
  message: string;
  fetchedDate: Date | null;
  fetchStudyRooms: (date: Date, timeRange: TimeRange) => Promise<void>;
}

export const useStudyRoomApi = (): UseStudyRoomApiReturn => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fetchedDate, setFetchedDate] = useState<Date | null>(null);

  const fetchStudyRooms = async (date: Date, timeRange: TimeRange) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let body = {date};

      if (timeRange.startTime) {
        body.startTime = moment(timeRange.startTime).format('HH:mm');
      }
      if (timeRange.endTime) {
        body.endTime = moment(timeRange.endTime).format('HH:mm');
      }

      const {result, success, message} = await getStudyRooms(body);

      if (success) {
        setMessage(message);
        setStudyRooms(result.content);
        setFetchedDate(date);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    studyRooms,
    isLoading,
    message,
    fetchedDate,
    fetchStudyRooms,
  };
};
