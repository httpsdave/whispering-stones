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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-graveyard-night border-4 border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl pixel-text text-gray-100 mb-2">
                {deceased.name}
              </h2>
              {(deceased.birth_date || deceased.death_date) && (
                <p className="text-base md:text-lg pixel-text text-gray-300">
                  {deceased.birth_date || '?'} — {deceased.death_date || '?'}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl md:text-3xl pixel-text"
            >
              ✕
            </button>
          </div>

          {/* Epitaph */}
          <div className="mb-6">
            <h3 className="text-sm md:text-base pixel-text text-gray-400 mb-2">
              💀 Epitaph
            </h3>
            <p className="text-base md:text-lg pixel-text text-gray-200 italic">
              "{deceased.epitaph}"
            </p>
          </div>

          {/* Notes */}
          {deceased.notes && (
            <div className="mb-6">
              <h3 className="text-sm md:text-base pixel-text text-gray-400 mb-2">
                📜 Memories & Notes
              </h3>
              <p className="text-sm md:text-base pixel-text text-gray-300 whitespace-pre-wrap leading-relaxed">
                {deceased.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-8">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 pixel-border px-4 py-3 bg-purple-900 hover:bg-purple-800 text-white pixel-text transition-all"
              >
                ✏️ Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 pixel-border px-4 py-3 bg-red-900 hover:bg-red-800 text-white pixel-text transition-all"
              >
                🗑️ Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 pixel-border px-4 py-3 bg-graveyard-dark hover:bg-gray-800 text-white pixel-text transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
