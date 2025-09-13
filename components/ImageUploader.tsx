
import React, { useState, useCallback } from 'react';
import type { ImageFile } from '../types';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (imageFile: ImageFile | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onImageUpload({ file, base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
       if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onImageUpload({ file, base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPreview(null);
      onImageUpload(null);
  };


  return (
    <div>
        <label
            htmlFor="image-upload"
            className="cursor-pointer block"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                id="image-upload"
                name="image-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
            />
            {preview ? (
                <div className="relative group aspect-square w-full rounded-lg overflow-hidden">
                    <img src={preview} alt="Image preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button onClick={handleRemoveImage} className="bg-red-500/80 text-white font-semibold py-2 px-4 rounded-lg">
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div className="aspect-square w-full border-2 border-dashed border-gray-600 hover:border-purple-400 transition-colors duration-300 rounded-lg flex flex-col items-center justify-center text-center text-gray-400 p-4">
                    <UploadIcon />
                    <span className="mt-2 font-semibold">Click to upload or drag & drop</span>
                    <span className="text-sm">PNG, JPG, WEBP (Max 5MB)</span>
                </div>
            )}
        </label>
    </div>
  );
};
