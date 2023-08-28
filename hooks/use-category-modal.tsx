// Import the 'create' function from 'zustand' for creating a store
import { create } from 'zustand';

// Define the structure of the state managed by this store
interface useCategoryModalStore {
    isOpen: boolean;        // Indicates if the modal is open or closed
    isEdit: boolean;        // Indicates if the modal is in edit mode
    editId?: string;        // ID of the category being edited (if in edit mode)
    onOpen: () => void;     // Function to open the modal
    onEdit: (id: string) => void; // Function to open the modal in edit mode with a specific category ID
    onClose: () => void;    // Function to close the modal
}

// Create a store instance using the 'create' function
export const useCategoryModal = create<useCategoryModalStore>((set) => ({
    isOpen: false,                // Initialize the modal as closed
    isEdit: false,                // Initialize as not in edit mode
    editId: undefined,            // Initialize with no category ID
    // Function to open the modal
    onOpen: () => set({ isOpen: true }),
    // Function to open the modal in edit mode with a specific category ID
    onEdit: (id: string) => set({ isOpen: true, isEdit: true, editId: id }),
    // Function to close the modal and reset its state
    onClose: () => set({ isOpen: false, isEdit: false, editId: undefined }),
}));
