export interface StudyRoomType {
  id: number;
  name: string;
  location: string;
  maxCapacity: number;
  minCapacity: number;
  reservedTimes: Record<number, boolean>;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface StudyRoomPageResponse {
  content: StudyRoomType[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponse<T> {
  result: T;
  success: boolean;
  code: number;
  message: string;
}

// 스터디룸 조회 API 응답 타입
export type StudyRoomListResponse = ApiResponse<StudyRoomPageResponse>;

export interface StudyRoomSearchParams {
  date?: string; // "YYYY-MM-DD" 형식
  startTime?: string; // "HH:mm" 형식
  endTime?: string; // "HH:mm" 형식
  page?: number; // 기본값 0
  size?: number; // 기본값 7
}

export interface StudyRoomResponse {
  content: StudyRoomType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ReservationStudyRoomParams {
  studyRoomId: number;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  participants: participants[];
}

export interface participants {
  identifier: string;
  name: string;
  date: string;
}

export interface ReservationType {
  id: number;
  studyRoom: StudyRoomType;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'CONFIRMED' | 'CANCELLED';
  participants: participants[];
}
