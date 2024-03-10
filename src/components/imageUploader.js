"use client";

import React, { useEffect, useState } from "react";

const ImageUploader = ({ defaultImageUrl, onImageSelected }) => {
    const [imagePreview, setImagePreview] = useState(defaultImageUrl);

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (
            file &&
            ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        ) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                onImageSelected(file);
            };
            reader.readAsDataURL(file);
        } else {
            console.error("Unsupported file format.");
        }
    };

    useEffect(() => {
        if (defaultImageUrl) {
            setImagePreview(defaultImageUrl);
        }
    }, [defaultImageUrl]);

    return (
        <label className="block cursor-pointer">
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleInputChange}
                style={{ display: "none" }}
            />
            {imagePreview ? (
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
            ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-300">
                    <span>Upload Image</span>
                </div>
            )}
        </label>
    );
};

export default ImageUploader;
