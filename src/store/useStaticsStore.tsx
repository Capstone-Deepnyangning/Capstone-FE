import {Statics} from '@/types/statics';
import {create} from 'zustand';

interface StaticsStore {
  statics: Statics | null;
  setStatics: (statics: Statics) => void;
}

export const useStaticsStore = create<StaticsStore>((set) => ({
  statics: null,
  setStatics: (statics: Statics) => set({statics}),
}));
