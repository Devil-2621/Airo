import { create } from 'zustand';

const defaultvalues = { id: '', title: '' };

interface IRenameModal {
    isOpen: boolean;
    initialValues: typeof defaultvalues;
    onOpen: (id: string, title: string) => void;
    onClose: () => void;
};

export const useNoteRenameModal = create<IRenameModal>((set) => ({
    isOpen: false,
    onOpen: (id: string, title: string) => set({
        isOpen: true,
        initialValues: { id, title },
    }),
    onClose: () => set({
        isOpen: false,
        initialValues: defaultvalues,
    }),
    initialValues: defaultvalues,
}));