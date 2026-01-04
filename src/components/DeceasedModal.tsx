'use client';

import React, { useEffect, useRef } from 'react';
import type { Deceased } from '@/types';

interface DeceasedModalProps {
  deceased: Deceased | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DeceasedModal({ deceased, isOpen, onClose, onEdit, onDelete }: DeceasedModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !deceased) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-graveyard-night border-4 border-gray-700 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-2">
              <h2 className="text-lg md:text-2xl pixel-text text-gray-100 mb-1 break-words">
                {deceased.name}
              </h2>
              {(deceased.birth_date || deceased.death_date) && (
                <p className="text-xs md:text-sm pixel-text text-gray-300">
                  {deceased.birth_date || '?'} — {deceased.death_date || '?'}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-xl md:text-2xl pixel-text flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Epitaph */}
          <div className="mb-4">
            <h3 className="text-xs md:text-sm pixel-text text-gray-400 mb-1">
              💀 Epitaph
            </h3>
            <p className="text-sm md:text-base pixel-text text-gray-200 italic break-words">
              "{deceased.epitaph}"
            </p>
          </div>

          {/* Notes */}
          {deceased.notes && (
            <div className="mb-4">
              <h3 className="text-xs md:text-sm pixel-text text-gray-400 mb-1">
                📜 Memories & Notes
              </h3>
              <p className="text-xs md:text-sm pixel-text text-gray-300 whitespace-pre-wrap leading-relaxed break-words">
                {deceased.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            {onEdit && (
              <button
                onClick={onEdit}
                className="col-span-1 pixel-border px-3 py-2 md:px-4 md:py-3 bg-purple-900 hover:bg-purple-800 text-white pixel-text text-xs md:text-sm transition-all"
              >
                ✏️ Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="col-span-1 pixel-border px-3 py-2 md:px-4 md:py-3 bg-red-900 hover:bg-red-800 text-white pixel-text text-xs md:text-sm transition-all"
              >
                🗑️ Delete
              </button>
            )}
            <button
              onClick={onClose}
              className={`pixel-border px-3 py-2 md:px-4 md:py-3 bg-graveyard-dark hover:bg-gray-800 text-white pixel-text text-xs md:text-sm transition-all ${
                (onEdit || onDelete) ? 'col-span-2' : 'col-span-2'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
