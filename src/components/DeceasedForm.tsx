'use client';

import React, { useState, useEffect } from 'react';
import { useDeceasedStore } from '@/store/deceasedStore';
import TombstonePicker from './TombstonePicker';
import type { Deceased, TombstoneStyle } from '@/types';

interface DeceasedFormProps {
  isOpen: boolean;
  onClose: () => void;
  deceased?: Deceased | null;
  userId: string;
}

export default function DeceasedForm({ isOpen, onClose, deceased, userId }: DeceasedFormProps) {
  const { addDeceased, updateDeceased } = useDeceasedStore();
  
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [epitaph, setEpitaph] = useState('');
  const [notes, setNotes] = useState('');
  const [tombstoneStyle, setTombstoneStyle] = useState<TombstoneStyle>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (deceased) {
      setName(deceased.name);
      setBirthDate(deceased.birth_date || '');
      setDeathDate(deceased.death_date || '');
      setEpitaph(deceased.epitaph);
      setNotes(deceased.notes || '');
      setTombstoneStyle(deceased.tombstone_style as TombstoneStyle);
    } else {
      resetForm();
    }
  }, [deceased, isOpen]);

  const resetForm = () => {
    setName('');
    setBirthDate('');
    setDeathDate('');
    setEpitaph('');
    setNotes('');
    setTombstoneStyle(1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (deceased) {
        await updateDeceased(deceased.id, {
          name,
          birth_date: birthDate || null,
          death_date: deathDate || null,
          epitaph,
          notes: notes || null,
          tombstone_style: tombstoneStyle,
        });
      } else {
        await addDeceased({
          user_id: userId,
          name,
          birth_date: birthDate || null,
          death_date: deathDate || null,
          epitaph,
          notes: notes || null,
          tombstone_style: tombstoneStyle,
          position_x: Math.floor(Math.random() * 100),
          position_y: Math.floor(Math.random() * 100),
        });
      }
      
      resetForm();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save memorial');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-black bg-opacity-80 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="bg-graveyard-night border-2 sm:border-4 border-gray-700 rounded-lg max-w-md w-full my-2 sm:my-8 max-h-[98vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-3 sm:p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-2 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl pixel-text text-gray-100">
              {deceased ? '✏️ Edit Memorial' : '+ Create Memorial'}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-200 text-xl sm:text-2xl pixel-text -mt-1"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-2 sm:mb-3 p-2 bg-red-900 border-2 border-red-700 rounded text-xs pixel-text text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2 sm:space-y-3">
            {/* Name */}
            <div>
              <label className="block text-xs pixel-text text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
                className="w-full px-3 py-2 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs pixel-text text-gray-300 mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                  placeholder="1990"
                />
              </div>
              <div>
                <label className="block text-xs pixel-text text-gray-300 mb-1">
                  Death Date
                </label>
                <input
                  type="date"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                  className="w-full px-3 py-2 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                  placeholder="2025"
                />
              </div>
            </div>

            {/* Epitaph */}
            <div>
              <label className="block text-xs pixel-text text-gray-300 mb-1">
                Epitaph (Tombstone Text) *
              </label>
              <input
                type="text"
                value={epitaph}
                onChange={(e) => setEpitaph(e.target.value)}
                required
                maxLength={100}
                className="w-full px-3 py-2 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-sm text-gray-100 focus:outline-none focus:border-purple-500"
                placeholder="Forever in our hearts"
              />
              <p className="text-xs pixel-text text-gray-500 mt-0.5">
                {epitaph.length}/100 characters
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs pixel-text text-gray-300 mb-1">
                Memories & Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                maxLength={1000}
                className="w-full px-3 py-2 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-sm text-gray-100 focus:outline-none focus:border-purple-500 resize-none"
                placeholder="Share your memories and stories about this person..."
              />
              <p className="text-xs pixel-text text-gray-500 mt-0.5">
                {notes.length}/1000 characters
              </p>
            </div>

            {/* Tombstone Style */}
            <div>
              <label className="block text-xs pixel-text text-gray-300 mb-2">
                Choose Tombstone Design
              </label>
              <TombstonePicker
                selected={tombstoneStyle}
                onSelect={setTombstoneStyle}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-5 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="pixel-text text-sm sm:text-base text-white hover:text-gray-300 disabled:text-gray-500 transition-all px-3 sm:px-4 py-1.5 sm:py-2"
            >
              {loading ? 'Saving...' : deceased ? 'Update Memorial' : 'Create Memorial'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="pixel-text text-sm sm:text-base text-white hover:text-gray-300 transition-all px-3 sm:px-4 py-1.5 sm:py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
