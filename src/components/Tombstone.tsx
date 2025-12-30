import React from 'react';
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
  const renderTombstoneShape = () => {
    const baseClasses = "w-full h-full flex items-center justify-center relative cursor-pointer transition-transform hover:scale-105";
    
    switch (style) {
      case 1: // Classic rounded top
        return (
          <div className={`${baseClasses} bg-gray-600 rounded-t-full border-4 border-gray-800`}>
            {renderText()}
          </div>
        );
      case 2: // Cross shape
        return (
          <div className={`${baseClasses} bg-gray-500`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gray-600 border-2 border-gray-800" />
            <div className="absolute top-1/4 left-0 w-full h-3 bg-gray-600 border-2 border-gray-800" />
            {renderText()}
          </div>
        );
      case 3: // RIP stone
        return (
          <div className={`${baseClasses} bg-gray-700 border-4 border-gray-900 rounded-lg`}>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl font-bold pixel-text text-gray-300">
              R.I.P
            </div>
            {renderText(true)}
          </div>
        );
      case 4: // Ornate monument
        return (
          <div className={`${baseClasses} bg-gradient-to-b from-gray-500 to-gray-700 border-4 border-gray-900`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-600 rotate-45 -translate-y-4 border-2 border-gray-800" />
            {renderText()}
          </div>
        );
      case 5: // Gothic pointed
        return (
          <div className={`${baseClasses} bg-gray-600 border-4 border-gray-900`}
               style={{ clipPath: 'polygon(50% 0%, 100% 20%, 100% 100%, 0 100%, 0 20%)' }}>
            {renderText()}
          </div>
        );
      case 6: // Simple rectangular
        return (
          <div className={`${baseClasses} bg-gray-700 border-4 border-gray-900 rounded`}>
            {renderText()}
          </div>
        );
      case 7: // Weathered stone
        return (
          <div className={`${baseClasses} bg-gray-500 border-4 border-gray-800 rounded-t-3xl opacity-80`}>
            {renderText()}
          </div>
        );
      case 8: // Celtic cross
        return (
          <div className={`${baseClasses} bg-gray-600`}>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gray-600 border-2 border-gray-800" />
            <div className="absolute top-1/4 left-0 w-full h-3 bg-gray-600 border-2 border-gray-800" />
            {renderText()}
          </div>
        );
      default:
        return renderTombstoneShape();
    }
  };

  const renderText = (hasRIP = false) => {
    const topOffset = hasRIP ? 'top-12' : 'top-4';
    return (
      <div className={`absolute ${topOffset} inset-x-2 text-center space-y-1 z-10`}>
        <p className="text-xs md:text-sm font-bold pixel-text text-gray-200 truncate">
          {name}
        </p>
        {(birthDate || deathDate) && (
          <p className="text-[10px] md:text-xs pixel-text text-gray-300">
            {birthDate || '?'} - {deathDate || '?'}
          </p>
        )}
        <p className="text-[8px] md:text-[10px] pixel-text text-gray-400 line-clamp-2 px-1">
          {epitaph}
        </p>
      </div>
    );
  };

  return (
    <div 
      className={`w-24 h-32 md:w-32 md:h-40 relative ${className}`}
      onClick={onClick}
    >
      {renderTombstoneShape()}
    </div>
  );
}
