import {create} from 'zustand';
import moment from 'moment';
import {StudyRoomType} from '@/types/studyroom';
import {getStudyRooms} from '@/services/studyroom';

interface DateRange {
  startDate: string;
}

interface TimeRange {
  startTime: string;
  endTime: string;
}

interface StudyRoomState {
  // 날짜 범위
  dateRange: DateRange;
  // 시간 범위
  timeRange: TimeRange;
  // 가능한 시간 옵션들
  availableTimeOptions: string[];
  // 스터디룸 목록
  studyRooms: StudyRoomType[];
  isLoading: boolean;
  message: string;
  fetchedDate: string;
  currentPage: number;

  // Actions
  setDateRange: (range: DateRange) => void;
  setTimeRange: (range: TimeRange) => void;
  setAvailableTimeOptions: (times: string[]) => void;
  resetSelections: () => void;
  fetchStudyRooms: () => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useStudyRoomStore = create<StudyRoomState>((set, get) => ({
  dateRange: {
    startDate: moment().format('YYYY-MM-DD'),
  },
  timeRange: {
    startTime: '',
    endTime: '',
  },
  availableTimeOptions: ['9시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시'],
  studyRooms: [],
  isLoading: false,
  message: '',
  fetchedDate: moment().format('YYYY-MM-DD'),
  currentPage: 0,

  setDateRange: (range) => set({dateRange: range}),
  setTimeRange: (range) => set({timeRange: range}),
  setAvailableTimeOptions: (times) => set({availableTimeOptions: times}),
  setCurrentPage: (page) => set({currentPage: page}),
  resetSelections: () =>
    set({
      dateRange: {
        startDate: moment().format('YYYY-MM-DD'),
      },
      timeRange: {startTime: '', endTime: ''},
      currentPage: 0,
    }),
  fetchStudyRooms: async () => {
    const {isLoading, dateRange, timeRange, currentPage} = get();
    if (isLoading) return;

    set({isLoading: true});
    try {
      const body: {
        date: string;
        page: number;
        size: number;
        startTime?: string;
        endTime?: string;
      } = {
        date: dateRange.startDate,
        page: currentPage,
        size: 20,
      };

      if (timeRange.startTime) {
        body.startTime = `${timeRange.startTime.padStart(2, '0')}:00`;
      }
      if (timeRange.endTime) {
        body.endTime = `${timeRange.endTime.padStart(2, '0')}:00`;
      }

      console.log('body', body);
      const {result, success, message} = await getStudyRooms(body);

      if (success) {
        set({
          message,
          studyRooms: result.content,
          fetchedDate: dateRange.startDate,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({isLoading: false});
    }
  },
}));

export default useStudyRoomStore;
