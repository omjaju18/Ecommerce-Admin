import { create } from 'zustand';

interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void; //open a modal
    onClose: () => void; //close the modal
}

//set is a function provided by Zustand(used for validation) to update the store's state.

export const useStoreModal = create<useStoreModalStore>((set) => ({
    isOpen: false, //initial state
    onOpen: () => set({ isOpen: true }), //open a modal
    onClose: () => set({ isOpen: false }), //close a modal
}));
