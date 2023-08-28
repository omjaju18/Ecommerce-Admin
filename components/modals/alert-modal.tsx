"use client";
import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

// Define the expected props for the AlertModal component.
interface AlertModalProps {
    isOpen: boolean; // Indicates whether the modal is open or closed.
    onClose: () => void; // Function to close the modal.
    onConfirm: () => void; // Function to confirm the action.
    loading: boolean; // Indicates whether a loading state is active.
}

// Define the AlertModal component.
export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    // State to track whether the component is mounted.
    const [isMounted, setIsMounted] = useState(false);

    // Effect to set isMounted to true when the component mounts.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not mounted, don't render anything.
    if (!isMounted) {
        return null;
    }

    // Render the Modal component with a title, description, Cancel button, and Continue button.
    return (
        <Modal
            title="Are you sure?" // Modal title.
            description="This action cannot be undone." // Modal description.
            isOpen={isOpen} // Determines if the modal is visible.
            onClose={onClose} // Function to close the modal.
        >
            {/* Button container */}
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                {/* Cancel button */}
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>

                {/* Continue button */}
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    );
};
