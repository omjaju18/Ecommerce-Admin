
"use client"; 
import { useEffect, useState } from "react"; 
import { StoreModal } from "@/components/modals/store-modal"; 

// Define a React component named ModalProvider
export const ModalProvider = () => {
    // Define a state variable to track whether the component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // Use the useEffect hook to set isMounted to true when the component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not yet mounted, return null (component is not rendered)
    if (!isMounted) {
        return null;
    }

    // If the component is mounted, render the StoreModal component
    return (
        <>
            <StoreModal />
        </>
    );
}
