"use client"

import { useEffect, useState } from "react";
// Define a custom React hook named 'useOrigin'
export const useOrigin = () => {
    // State to track whether the component is mounted
    const [mounted, setMounted] = useState(false);

    // Calculate the 'origin' based on the client-side environment
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    // Effect to set 'mounted' to true when the component is mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    // Check if the component is not yet mounted, return an empty string
    if (!mounted) {
        return '';
    }

    // Return the calculated 'origin'
    return origin;
};
