import React, { useState } from 'react';
import type { TombstoneStyle } from '@/types';

interface TombstoneProps {
  style: TombstoneStyle;
  name: string;
  birthDate?: string | null;
  deathDate?: string | null;
  epitaph: string;
  onClick?: () => void;
  className?: string;
}

export default function Tombstone({ 
  style, 
  name, 
  birthDate, 
  deathDate, 
  epitaph, 
  onClick,
  className = ''
}: TombstoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCrossStyle = style === 2 || style === 8;

  // Extract year from date string (e.g., "2026-01-27" -> "2026")
  const getYear = (dateString: string | null | undefined): string => {
    if (!dateString) return '?';
    const year = dateString.split('-')[0];
    return year || '?';
  };

  const renderTombstoneShape = () => {
    const baseClasses = "w-full h-full flex items-center justify-center relative cursor-pointer transition-all duration-300 hover:scale-105";
    
    switch (style) {
      case 1: // Classic rounded top
        return (
          <div className={baseClasses}>
            {/* Shadow - solid, no blur */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-black opacity-40" />
            {/* Main stone */}
            <div className="w-full h-full relative" style={{ imageRendering: 'pixelated' }}>
              {/* Top rounded part - blocky pixels */}
              <div className="absolute top-0 left-[20%] w-[10%] h-[8%] bg-slate-600 border border-slate-900" />
              <div className="absolute top-[8%] left-[15%] w-[20%] h-[6%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[8%] right-[15%] w-[20%] h-[6%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-0 right-[20%] w-[10%] h-[8%] bg-slate-600 border border-slate-900" />
              <div className="absolute top-[14%] left-[10%] right-[10%] h-[6%] bg-slate-400 border border-slate-900" />
              {/* Main body - solid blocks */}
              <div className="absolute top-[20%] left-0 w-full h-[60%] bg-slate-500 border-2 border-slate-900" />
              <div className="absolute top-[22%] left-[5%] w-[90%] h-[56%] bg-slate-600" />
              {/* Base shadow - solid block */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border-2 border-slate-900" />
            </div>
            {renderText()}
          </div>
        );
      case 2: // Cross shape
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-black opacity-40" />
            {/* Base platform with detail */}
            <div className="absolute bottom-0 left-[18%] right-[18%] h-[22%] bg-slate-800 border-2 border-black" />
            <div className="absolute bottom-[2%] left-[20%] w-[25%] h-[18%] bg-slate-700" />
            <div className="absolute bottom-[2%] right-[20%] w-[25%] h-[18%] bg-slate-800" />
            {/* Vertical beam with shading */}
            <div className="absolute top-[5%] bottom-[20%] left-[38%] right-[38%] bg-slate-600 border-2 border-slate-900" />
            <div className="absolute top-[7%] bottom-[22%] left-[40%] w-[8%] h-[calc(100%-29%)] bg-slate-500" />
            <div className="absolute top-[7%] bottom-[22%] right-[40%] w-[8%] h-[calc(100%-29%)] bg-slate-700" />
            {/* Dithering on vertical beam */}
            <div className="absolute top-[15%] left-[48%] w-[4%] h-[2%] bg-slate-600" />
            <div className="absolute top-[25%] left-[48%] w-[4%] h-[2%] bg-slate-600" />
            <div className="absolute top-[35%] left-[48%] w-[4%] h-[2%] bg-slate-600" />
            {/* Horizontal beam with shading */}
            <div className="absolute top-[23%] left-[12%] right-[12%] h-[18%] bg-slate-600 border-2 border-slate-900" />
            <div className="absolute top-[25%] left-[14%] right-[14%] h-[7%] bg-slate-500" />
            <div className="absolute top-[32%] left-[14%] right-[14%] h-[7%] bg-slate-700" />
            {/* Dithering on horizontal beam */}
            <div className="absolute top-[31%] left-[20%] w-[3%] h-[2%] bg-slate-600" />
            <div className="absolute top-[31%] left-[30%] w-[3%] h-[2%] bg-slate-600" />
            <div className="absolute top-[31%] right-[20%] w-[3%] h-[2%] bg-slate-600" />
            {/* Hover text */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} bg-black bg-opacity-75 z-20`}>
              {renderText()}
            </div>
          </div>
        );
      case 3: // RIP stone
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-black opacity-40" />
            {/* Main stone with detailed arch */}
            <div className="w-full h-full relative">
              {/* Top arch - detailed pixels */}
              <div className="absolute top-0 left-[42%] w-[16%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[3%] left-[30%] w-[12%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[3%] right-[30%] w-[12%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[6%] left-[20%] w-[12%] h-[4%] bg-slate-400 border border-slate-900" />
              <div className="absolute top-[6%] right-[20%] w-[12%] h-[4%] bg-slate-400 border border-slate-900" />
              <div className="absolute top-[10%] left-[12%] w-[10%] h-[4%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[10%] right-[12%] w-[10%] h-[4%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[14%] left-[8%] right-[8%] h-[4%] bg-slate-400 border border-slate-900" />
              {/* Main body with detailed shading */}
              <div className="absolute top-[18%] left-0 right-0 h-[62%] bg-slate-600 border-2 border-slate-900" />
              <div className="absolute top-[20%] left-[2%] w-[20%] h-[58%] bg-slate-500" />
              <div className="absolute top-[20%] left-[22%] w-[56%] h-[58%] bg-slate-600" />
              <div className="absolute top-[20%] right-[2%] w-[20%] h-[58%] bg-slate-700" />
              {/* Dithering */}
              <div className="absolute top-[30%] left-[20%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[40%] left-[20%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[50%] left-[20%] w-[2%] h-[3%] bg-slate-600" />
              {/* RIP text with shadow */}
              <div className="absolute top-[29%] left-1/2 -translate-x-1/2 text-2xl font-bold pixel-text text-black z-10">
                R.I.P
              </div>
              <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-2xl font-bold pixel-text text-slate-800 z-9" style={{ transform: 'translate(-50%, -1px) translateX(-1px)' }}>
                R.I.P
              </div>
              {/* Base */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-800 border-2 border-black" />
            </div>
            {renderText(true)}
          </div>
        );
      case 4: // Ornate monument
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-1 bg-black opacity-40" />
            {/* Diamond top with detail */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-300 border border-black z-10" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-400 border border-slate-900 z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-slate-500 border border-slate-900 z-10" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-600 border border-slate-900 z-10" />
            {/* Main stone with detailed sections */}
            <div className="w-full h-full relative">
              {/* Top section with shading */}
              <div className="absolute top-0 left-[5%] right-[5%] h-[25%] bg-slate-500 border-2 border-slate-900" />
              <div className="absolute top-[2%] left-[7%] w-[20%] h-[21%] bg-slate-400" />
              <div className="absolute top-[2%] right-[7%] w-[20%] h-[21%] bg-slate-600" />
              {/* Dithering on top section */}
              <div className="absolute top-[8%] left-[25%] w-[2%] h-[2%] bg-slate-500" />
              <div className="absolute top-[12%] left-[25%] w-[2%] h-[2%] bg-slate-500" />
              {/* Middle section with detail */}
              <div className="absolute top-[23%] left-0 right-0 h-[52%] bg-slate-600 border-2 border-slate-900" />
              <div className="absolute top-[25%] left-[3%] w-[22%] h-[48%] bg-slate-500" />
              <div className="absolute top-[25%] left-[25%] w-[50%] h-[48%] bg-slate-600" />
              <div className="absolute top-[25%] right-[3%] w-[22%] h-[48%] bg-slate-700" />
              {/* Dithering on middle */}
              <div className="absolute top-[35%] left-[23%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[45%] left-[23%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[40%] right-[23%] w-[2%] h-[3%] bg-slate-600" />
              {/* Base with detail */}
              <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-slate-800 border-2 border-black" />
              <div className="absolute bottom-[2%] left-[2%] w-[30%] h-[21%] bg-slate-700" />
              <div className="absolute bottom-[2%] right-[2%] w-[30%] h-[21%] bg-slate-900" />
            </div>
            {renderText()}
          </div>
        );
      case 5: // Gothic pointed
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-black opacity-40" />
            {/* Main stone with pointed top - detailed steps */}
            <div className="w-full h-full relative">
              {/* Pointed top - detailed pixel steps */}
              <div className="absolute top-0 left-[47%] w-[6%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[3%] left-[43%] w-[14%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[6%] left-[38%] right-[38%] h-[3%] bg-slate-400 border border-slate-900" />
              <div className="absolute top-[9%] left-[32%] right-[32%] h-[3%] bg-slate-400 border border-slate-900" />
              <div className="absolute top-[12%] left-[25%] right-[25%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[15%] left-[18%] right-[18%] h-[3%] bg-slate-500 border border-slate-900" />
              <div className="absolute top-[18%] left-[12%] right-[12%] h-[3%] bg-slate-400 border border-slate-900" />
              <div className="absolute top-[21%] left-[8%] right-[8%] h-[3%] bg-slate-400 border border-slate-900" />
              {/* Main body with shading */}
              <div className="absolute top-[24%] left-0 w-full h-[56%] bg-slate-600 border-2 border-slate-900" />
              <div className="absolute top-[26%] left-[2%] w-[18%] h-[52%] bg-slate-500" />
              <div className="absolute top-[26%] left-[20%] w-[60%] h-[52%] bg-slate-600" />
              <div className="absolute top-[26%] right-[2%] w-[18%] h-[52%] bg-slate-700" />
              {/* Dithering */}
              <div className="absolute top-[35%] left-[18%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[45%] left-[18%] w-[2%] h-[3%] bg-slate-600" />
              {/* Base */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-800 border-2 border-black" />
            </div>
            {renderText()}
          </div>
        );
      case 6: // Simple rectangular
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-black opacity-40" />
            {/* Main stone with detailed shading */}
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-slate-600 border-2 border-slate-900" />
              {/* Light side */}
              <div className="absolute top-[5%] left-[3%] w-[20%] h-[70%] bg-slate-500" />
              {/* Middle */}
              <div className="absolute top-[5%] left-[23%] w-[54%] h-[70%] bg-slate-600" />
              {/* Dark side with dithering */}
              <div className="absolute top-[5%] right-[3%] w-[20%] h-[70%] bg-slate-700" />
              {/* Dithering pattern */}
              <div className="absolute top-[10%] left-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[20%] left-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[30%] left-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[40%] left-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[15%] right-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[25%] right-[21%] w-[2%] h-[3%] bg-slate-600" />
              <div className="absolute top-[35%] right-[21%] w-[2%] h-[3%] bg-slate-600" />
              {/* Base */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-800 border-2 border-black" />
              <div className="absolute bottom-[2%] left-[2%] w-[50%] h-[16%] bg-slate-700" />
            </div>
            {renderText()}
          </div>
        );
      case 7: // Weathered stone
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-black opacity-40" />
            {/* Main stone with detailed weathered top */}
            <div className="w-full h-full relative">
              {/* Rounded top - detailed pixels with weathering */}
              <div className="absolute top-0 left-[40%] w-[20%] h-[4%] bg-slate-400 border border-slate-800 opacity-90" />
              <div className="absolute top-[4%] left-[30%] w-[12%] h-[4%] bg-slate-400 border border-slate-800 opacity-85" />
              <div className="absolute top-[4%] right-[30%] w-[12%] h-[4%] bg-slate-400 border border-slate-800 opacity-85" />
              <div className="absolute top-[8%] left-[20%] w-[15%] h-[4%] bg-slate-500 border border-slate-800 opacity-90" />
              <div className="absolute top-[8%] right-[20%] w-[15%] h-[4%] bg-slate-500 border border-slate-800 opacity-90" />
              <div className="absolute top-[12%] left-[12%] w-[15%] h-[4%] bg-slate-500 border border-slate-800 opacity-85" />
              <div className="absolute top-[12%] right-[12%] w-[15%] h-[4%] bg-slate-500 border border-slate-800 opacity-85" />
              <div className="absolute top-[16%] left-[8%] right-[8%] h-[4%] bg-slate-400 border border-slate-800 opacity-90" />
              {/* Main body with weathering effects */}
              <div className="absolute top-[20%] left-0 right-0 h-[60%] bg-slate-600 border-2 border-slate-800 opacity-90" />
              <div className="absolute top-[22%] left-[2%] w-[20%] h-[56%] bg-slate-500 opacity-85" />
              <div className="absolute top-[22%] left-[22%] w-[56%] h-[56%] bg-slate-600 opacity-90" />
              <div className="absolute top-[22%] right-[2%] w-[20%] h-[56%] bg-slate-700 opacity-85" />
              {/* Weathering spots */}
              <div className="absolute top-[30%] left-[30%] w-[3%] h-[3%] bg-slate-700 opacity-70" />
              <div className="absolute top-[45%] right-[25%] w-[4%] h-[3%] bg-slate-700 opacity-70" />
              {/* Base */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-slate-700 border-2 border-slate-900" />
            </div>
            {renderText()}
          </div>
        );
      case 8: // Celtic cross
        return (
          <div className={baseClasses}>
            {/* Shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-1 bg-black opacity-40" />
            {/* Base platform with detail */}
            <div className="absolute bottom-0 left-[18%] right-[18%] h-[20%] bg-slate-800 border-2 border-black" />
            <div className="absolute bottom-[2%] left-[20%] w-[25%] h-[16%] bg-slate-700" />
            <div className="absolute bottom-[2%] right-[20%] w-[25%] h-[16%] bg-slate-900" />
            {/* Vertical beam with detailed shading */}
            <div className="absolute top-[5%] bottom-[18%] left-[38%] right-[38%] bg-slate-600 border-2 border-slate-900" />
            <div className="absolute top-[7%] bottom-[20%] left-[40%] w-[8%] h-[calc(100%-27%)] bg-slate-500" />
            <div className="absolute top-[7%] bottom-[20%] right-[40%] w-[8%] h-[calc(100%-27%)] bg-slate-700" />
            {/* Dithering on vertical */}
            <div className="absolute top-[15%] left-[48%] w-[4%] h-[2%] bg-slate-600" />
            <div className="absolute top-[30%] left-[48%] w-[4%] h-[2%] bg-slate-600" />
            {/* Horizontal beam with detail */}
            <div className="absolute top-[22%] left-[12%] right-[12%] h-[18%] bg-slate-600 border-2 border-slate-900" />
            <div className="absolute top-[24%] left-[14%] right-[14%] h-[7%] bg-slate-500" />
            <div className="absolute top-[31%] left-[14%] right-[14%] h-[7%] bg-slate-700" />
            {/* Celtic ring - detailed square */}
            <div className="absolute top-[16%] left-[34%] w-[32%] h-[24%] bg-slate-600 border-2 border-slate-900 z-10" />
            <div className="absolute top-[18%] left-[36%] w-[14%] h-[20%] bg-slate-500 z-10" />
            <div className="absolute top-[18%] right-[36%] w-[14%] h-[20%] bg-slate-700 z-10" />
            {/* Inner hole with detail */}
            <div className="absolute top-[23%] left-[42%] w-[16%] h-[10%] bg-slate-400 border border-slate-900 z-10" />
            {/* Decorative pixels on ring */}
            <div className="absolute top-[20%] left-[48%] w-[4%] h-[2%] bg-slate-600 z-10" />
            <div className="absolute top-[32%] left-[48%] w-[4%] h-[2%] bg-slate-600 z-10" />
            {/* Hover text */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} bg-black bg-opacity-75 z-20`}>
              {renderText()}
            </div>
          </div>
        );
      default:
        return renderTombstoneShape();
    }
  };

  const renderText = (hasRIP = false) => {
    const topOffset = hasRIP ? 'top-[52%]' : 'top-[35%]';
    const birthYear = getYear(birthDate);
    const deathYear = getYear(deathDate);
    
    return (
      <div className={`absolute ${topOffset} left-0 right-0 text-center z-10 px-1`}>
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-[10px] md:text-xs font-bold pixel-text text-gray-100 leading-tight truncate max-w-full px-0.5">
            {name}
          </p>
          {(birthDate || deathDate) && (
            <p className="text-[8px] md:text-[10px] pixel-text text-gray-300 leading-tight">
              {birthYear} - {deathYear}
            </p>
          )}
          <p className="text-[7px] md:text-[9px] pixel-text text-gray-400 leading-tight line-clamp-2 px-0.5 mt-0.5">
            {epitaph}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`w-24 h-32 md:w-32 md:h-40 relative ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ imageRendering: 'pixelated' }}
    >
      {renderTombstoneShape()}
    </div>
  );
}
