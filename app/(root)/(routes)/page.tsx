"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
    // Obtain the `onOpen` and `isOpen` functions and state from the `useStoreModal` hook.
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    // Use an effect to open the modal when it's not already open.
    useEffect(() => {
        // If the modal is not open (isOpen is false), trigger the `onOpen` function to open it.
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    // This component doesn't render anything; it simply opens the modal when necessary.
    return null;
};

export default SetupPage;
