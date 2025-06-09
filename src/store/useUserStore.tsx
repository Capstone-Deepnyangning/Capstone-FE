import {create} from 'zustand';
import {setAuthToken} from '@/services/axios';
import {MMKV} from 'react-native-mmkv';

// MMKV 스토리지 인스턴스 생성
export const storage = new MMKV({
  id: 'user-storage',
  // 필요한 경우 암호화 키 추가
  // encryptionKey: 'encryption-key'
});

interface UserState {
  identifier: string;
  name: string;
  faceRegistration: boolean;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean;
  fcmTokens: string[];

  // Actions
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
  login: (userData: {identifier: string; name: string; accessToken: string; refreshToken: string}) => void;
  logout: () => void;
}

const initialState = {
  identifier: '',
  name: '',
  faceRegistration: false,
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  fcmTokens: [],
};

export const useUserStore = create<UserState>()((set) => ({
  ...initialState,

  // 유저 정보 부분 업데이트
  setUser: (user) => set((state) => ({...state, ...user})),

  // 유저 정보 초기화
  clearUser: () => {
    setAuthToken(''); // 토큰 제거
    set(initialState);
  },

  // 로그인
  login: (userData) =>
    set({
      identifier: userData.identifier,
      name: userData.name,
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
      isLoggedIn: true,
    }),

  // 로그아웃
  logout: () => {
    storage.clearAll();
    storage.delete('isAdmin');
    setAuthToken('');
    set(initialState);
  },
}));
