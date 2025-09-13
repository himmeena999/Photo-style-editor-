import React, { useState, useRef, useCallback } from 'react';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
}

export const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
  
  const handleMove = (clientX: number) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      handleMove(e.clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      handleMove(e.touches[0].clientX);
  }

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full aspect-square rounded-lg overflow-hidden select-none group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />
      <div
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div
        className="absolute inset-y-0 h-full w-1 bg-white/50 cursor-ew-resize"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-xl border-2 border-white/50 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
        </div>
      </div>
    </div>
  );
};