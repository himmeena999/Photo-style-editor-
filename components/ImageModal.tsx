import React, { useEffect } from 'react';
import { CloseIcon } from './IconComponents';

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close image view"
      >
        <CloseIcon className="w-8 h-8" />
      </button>
      <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
        <img 
          src={src} 
          alt="Generated result, zoomed in" 
          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};
