import {create} from 'zustand';

interface ModalState {
  isOpen: boolean;

  message: string;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  modal: ModalState;
  openModal: (modal: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
}

const initialState: ModalState = {
  isOpen: false,

  message: '',
  title: '',
};

export const useModalStore = create<ModalStore>((set) => ({
  modal: initialState,
  openModal: (modal) =>
    set({
      modal: {
        ...modal,
        isOpen: true,
      },
    }),
  closeModal: () => {
    set((state) => ({
      modal: {
        ...state.modal,
        isOpen: false,
      },
    }));

    setTimeout(() => {
      set({
        modal: initialState,
      });
    }, 500);
  },
}));
