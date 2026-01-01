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
    const pixelStyle = { imageRendering: 'pixelated' as const };
    
    switch (style) {
      case 1:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute top-0 left-[20%] w-[10%] h-[8%] bg-slate-600 border border-slate-900" />
            <div className="absolute top-[8%] left-[15%] w-[20%] h-[6%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[8%] right-[15%] w-[20%] h-[6%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-0 right-[20%] w-[10%] h-[8%] bg-slate-600 border border-slate-900" />
            <div className="absolute top-[14%] left-[10%] right-[10%] h-[6%] bg-slate-400 border border-slate-900" />
            <div className="absolute top-[20%] left-0 right-0 h-[60%] bg-slate-500 border border-slate-900" />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border border-slate-900" />
          </div>
        );
      case 2:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[20%] bg-slate-700 border border-slate-900" />
            <div className="absolute top-[5%] bottom-[18%] left-[40%] right-[40%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[25%] left-[15%] right-[15%] h-[15%] bg-slate-500 border border-slate-900" />
          </div>
        );
      case 3:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute top-0 left-[30%] right-[30%] h-[4%] bg-slate-600 border border-slate-900" />
            <div className="absolute top-[4%] left-[20%] w-[15%] h-[6%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[4%] right-[20%] w-[15%] h-[6%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[10%] left-[10%] right-[10%] h-[8%] bg-slate-400 border border-slate-900" />
            <div className="absolute top-[18%] left-0 right-0 h-[62%] bg-slate-500 border border-slate-900" />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border border-slate-900" />
            <span className="text-[8px] font-bold pixel-text text-slate-900 z-10">RIP</span>
          </div>
        );
      case 4:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-slate-300 border border-slate-900 z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-slate-400 border border-slate-900 z-10" />
            <div className="absolute top-0 left-[5%] right-[5%] h-[25%] bg-slate-400 border border-slate-900" />
            <div className="absolute top-[23%] left-0 right-0 h-[52%] bg-slate-500 border border-slate-900" />
            <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-slate-700 border border-slate-900" />
          </div>
        );
      case 5:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute top-0 left-[45%] w-[10%] h-[6%] bg-slate-600 border border-slate-900" />
            <div className="absolute top-[6%] left-[35%] right-[35%] h-[6%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[12%] left-[25%] right-[25%] h-[6%] bg-slate-400 border border-slate-900" />
            <div className="absolute top-[18%] left-[10%] right-[10%] h-[6%] bg-slate-400 border border-slate-900" />
            <div className="absolute top-[24%] left-0 w-full h-[56%] bg-slate-500 border border-slate-900" />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border border-slate-900" />
          </div>
        );
      case 6:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute inset-0 bg-slate-500 border border-slate-900" />
            <div className="absolute top-[5%] left-[5%] right-[5%] h-[70%] bg-slate-600" />
            <div className="absolute right-[5%] top-[5%] h-[70%] w-[8%] bg-slate-700" />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border border-slate-900" />
          </div>
        );
      case 7:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute top-0 left-[25%] w-[10%] h-[6%] bg-slate-500 border border-slate-800 opacity-90" />
            <div className="absolute top-0 right-[25%] w-[10%] h-[6%] bg-slate-500 border border-slate-800 opacity-90" />
            <div className="absolute top-[6%] left-[15%] right-[15%] h-[8%] bg-slate-400 border border-slate-800 opacity-90" />
            <div className="absolute top-[14%] left-[10%] right-[10%] h-[8%] bg-slate-400 border border-slate-800 opacity-90" />
            <div className="absolute top-[22%] left-0 right-0 h-[58%] bg-slate-500 border border-slate-800 opacity-90" />
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-600 border border-slate-900" />
          </div>
        );
      case 8:
        return (
          <div className={baseClasses} style={pixelStyle}>
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[18%] bg-slate-700 border border-slate-900" />
            <div className="absolute top-[5%] bottom-[16%] left-[40%] right-[40%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[22%] left-[15%] right-[15%] h-[15%] bg-slate-500 border border-slate-900" />
            <div className="absolute top-[16%] left-[35%] w-[30%] h-[22%] bg-slate-500 border border-slate-900 z-10" />
            <div className="absolute top-[23%] left-[43%] w-[14%] h-[8%] bg-slate-400 border border-slate-900 z-10" />
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
