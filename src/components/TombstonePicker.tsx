import React from 'react';
import type { TombstoneStyle } from '@/types';

interface TombstonePickerProps {
  selected: TombstoneStyle;
  onSelect: (style: TombstoneStyle) => void;
}

export default function TombstonePicker({ selected, onSelect }: TombstonePickerProps) {
  const styles: TombstoneStyle[] = [1, 2, 3, 4, 5, 6, 7, 8];
  
  const getStylePreview = (style: TombstoneStyle) => {
    const baseClasses = "w-full h-full flex items-center justify-center relative";
    
    switch (style) {
      case 1:
        return <div className={`${baseClasses} bg-gray-600 rounded-t-full border-2 border-gray-800`} />;
      case 2:
        return (
          <div className={`${baseClasses} bg-gray-500`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-600 border border-gray-800" />
            <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-600 border border-gray-800" />
          </div>
        );
      case 3:
        return (
          <div className={`${baseClasses} bg-gray-700 border-2 border-gray-900 rounded`}>
            <span className="text-[8px] font-bold pixel-text text-gray-300">RIP</span>
          </div>
        );
      case 4:
        return (
          <div className={`${baseClasses} bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-900`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rotate-45 -translate-y-1.5 border border-gray-800" />
          </div>
        );
      case 5:
        return (
          <div className={`${baseClasses} bg-gray-600 border-2 border-gray-900`}
               style={{ clipPath: 'polygon(50% 0%, 100% 20%, 100% 100%, 0 100%, 0 20%)' }} />
        );
      case 6:
        return <div className={`${baseClasses} bg-gray-700 border-2 border-gray-900 rounded`} />;
      case 7:
        return <div className={`${baseClasses} bg-gray-500 border-2 border-gray-800 rounded-t-2xl opacity-80`} />;
      case 8:
        return (
          <div className={`${baseClasses} bg-gray-600`}>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full border border-gray-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gray-600 border border-gray-800" />
            <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-600 border border-gray-800" />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4">
      {styles.map((style) => (
        <button
          key={style}
          onClick={() => onSelect(style)}
          className={`w-12 h-16 md:w-16 md:h-20 transition-all ${
            selected === style 
              ? 'ring-2 ring-purple-500 scale-110' 
              : 'hover:scale-105 opacity-70 hover:opacity-100'
          }`}
        >
          {getStylePreview(style)}
        </button>
      ))}
    </div>
  );
}
