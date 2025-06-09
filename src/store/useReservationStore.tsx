import {ReservationType} from '@/types/studyroom';
import {create} from 'zustand';

interface ReservationState {
  reservations: ReservationType[];
}

const initialState: ReservationState = {
  reservations: [],
};

export const useReservationStore = create<ReservationState>((set) => ({
  ...initialState,

  setReservations: (reservations: ReservationType[]) => set({reservations}),
  cancelReservation: (id: string) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) => (reservation.id === id ? {...reservation, status: 'CANCELLED'} : reservation)),
    })),
  addReservation: (reservation: ReservationType) =>
    set((state) => ({
      reservations: [reservation, ...state.reservations],
    })),
}));
