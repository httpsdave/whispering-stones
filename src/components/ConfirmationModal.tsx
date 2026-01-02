'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  children?: React.ReactNode;
  confirmText?: string;
  requiresTyping?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isDangerous?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = 'DELETE',
  requiresTyping = false,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  isDangerous = false,
}: ConfirmationModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(requiresTyping);

  useEffect(() => {
    if (requiresTyping) {
      setIsConfirmDisabled(inputValue !== confirmText);
    } else {
      setIsConfirmDisabled(false);
    }
  }, [inputValue, confirmText, requiresTyping]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setInputValue('');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    if (!isConfirmDisabled) {
      onConfirm();
      onClose();
      setInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full overflow-hidden"
        style={{
          clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/blackstone.webp"
            alt="Stone texture"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl md:text-2xl pixel-text text-gray-100 flex items-center gap-2">
              {isDangerous && <span className="text-red-500">⚠️</span>}
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl pixel-text ml-4"
            >
              ✕
            </button>
          </div>

          {/* Message */}
          <div className="mb-6">
            {children || (
              <p className="text-sm md:text-base pixel-text text-gray-300 whitespace-pre-wrap leading-relaxed">
                {message}
              </p>
            )}
          </div>

          {/* Input field if typing is required */}
          {requiresTyping && (
            <div className="mb-6">
              <label className="block text-xs md:text-sm pixel-text text-gray-400 mb-2">
                Type <span className="text-white font-bold">{confirmText}</span> to confirm:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-2 bg-black bg-opacity-50 border-2 border-gray-600 text-white pixel-text text-sm md:text-base focus:outline-none focus:border-gray-400"
                placeholder={confirmText}
                autoFocus
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white pixel-text text-sm md:text-base transition-all"
              style={{
                clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
              }}
            >
              {cancelButtonText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              className={`flex-1 px-4 py-3 pixel-text text-sm md:text-base transition-all ${
                isConfirmDisabled 
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                  : isDangerous
                  ? 'bg-red-700 hover:bg-red-600 text-white'
                  : 'bg-purple-700 hover:bg-purple-600 text-white'
              }`}
              style={{
                clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
              }}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
