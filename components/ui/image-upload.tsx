"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

// Define the props for the ImageUpload component.
interface ImageUploadProps {

    disabled?: boolean; // Indicates whether the component is disabled.

    onChange: (value: string) => void; // A function to be called when an image is changed.

    onRemove: (value: string) => void; // A function to be called when an image is removed.

    value: string[]; // An array of image URLs.
}

// Define the ImageUpload component.
const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    // Use useEffect to set the "isMounted" state to true when the component is mounted.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Define a function to be called when an image is uploaded.
    const onUpload = (result: any) => {

        onChange(result.info.secure_url); // Call the "onChange" function with the uploaded image URL.
    };

    // If the component is not mounted yet, return null to render nothing.
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">

                            {/* Render a button to remove the image */}
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">

                                <Trash className="h-4 w-4" /> {/* Render the Trash icon */}

                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            {/* Render the Cloudinary upload widget */}
            <CldUploadWidget onUpload={onUpload} uploadPreset="qp5rqdrl">
                {({ open }) => {

                    // Define a function to be called when the "Upload an Image" button is clicked.
                    const onClick = () => {
                        open();
                    };

                    return (

                        // Render a button to trigger the Cloudinary upload widget.
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >

                            <ImagePlus className="h-4 w-4 mr-2" /> {/* Render the ImagePlus icon */}
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUpload; // Export the ImageUpload component as the default export.
