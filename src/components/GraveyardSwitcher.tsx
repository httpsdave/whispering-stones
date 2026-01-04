'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGraveyardStore, type Graveyard } from '@/store/graveyardStore';

interface GraveyardSwitcherProps {
  onGraveyardChange?: (graveyard: Graveyard) => void;
}

const THEMES = [
  { id: 'stillwater', name: 'Stillwater Grounds', image: '/graveyarddesign1.gif' },
  { id: 'unremembered', name: 'Unremembered Grove', image: '/graveyarddesign2.gif' },
  { id: 'final-meadow', name: 'Final Meadow', image: '/graveyarddesign3.gif' },
  { id: 'sunset-ridge', name: 'Sunset Ridge', image: '/graveyarddesign4.gif' },
  { id: 'thunders-reach', name: "Thunder's Reach", image: '/graveyarddesign5.gif' },
];

export default function GraveyardSwitcher({ onGraveyardChange }: GraveyardSwitcherProps) {
  const { graveyards, activeGraveyard, createGraveyard, setActiveGraveyard, updateGraveyard, deleteGraveyard } = useGraveyardStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingGraveyard, setEditingGraveyard] = useState<Graveyard | null>(null);
  const [graveyardToDelete, setGraveyardToDelete] = useState<Graveyard | null>(null);
  const [newName, setNewName] = useState('');
  const [newTheme, setNewTheme] = useState('stillwater');
  const [creating, setCreating] = useState(false);

  const handleSwitch = async (graveyard: Graveyard) => {
    if (graveyard.id !== activeGraveyard?.id) {
      await setActiveGraveyard(graveyard.id);
      onGraveyardChange?.(graveyard);
    }
    setShowMenu(false);
  };

  const handleCreate = async () => {
    if (!newName.trim() || !activeGraveyard) return;
    
    setCreating(true);
    try {
      await createGraveyard(activeGraveyard.user_id, newName, newTheme);
      setNewName('');
      setNewTheme('stillwater');
      setShowCreateForm(false);
      setShowMenu(false);
    } catch (error) {
      console.error('Create graveyard error:', error);
      alert('Failed to create graveyard');
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async () => {
    if (!editingGraveyard || !newName.trim()) return;
    
    try {
      await updateGraveyard(editingGraveyard.id, { name: newName, theme: newTheme });
      setShowEditForm(false);
      setEditingGraveyard(null);
      setNewName('');
      setNewTheme('stillwater');
    } catch (error) {
      console.error('Update graveyard error:', error);
      alert('Failed to update graveyard');
    }
  };

  const handleDelete = async (graveyard: Graveyard) => {
    if (graveyards.length <= 1) {
      alert('You must have at least one graveyard');
      return;
    }

    setGraveyardToDelete(graveyard);
    setShowDeleteConfirm(true);
    setShowMenu(false);
  };

  const confirmDelete = async () => {
    if (!graveyardToDelete) return;

    try {
      await deleteGraveyard(graveyardToDelete.id);
      setShowDeleteConfirm(false);
      setGraveyardToDelete(null);
    } catch (error) {
      console.error('Delete graveyard error:', error);
      alert('Failed to delete graveyard');
    }
  };

  const startEdit = (graveyard: Graveyard) => {
    setEditingGraveyard(graveyard);
    setNewName(graveyard.name);
    setNewTheme(graveyard.theme);
    setShowEditForm(true);
    setShowMenu(false);
  };

  if (!activeGraveyard) return null;

  return (
    <div className="fixed top-6 right-4 z-40">
      {/* Active Graveyard Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="relative px-4 py-2 overflow-hidden transition-all hover:scale-105"
        style={{
          clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)'
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/blackstone.webp"
            alt="Stone texture"
            fill
            sizes="200px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative flex items-center gap-2">
          <span className="text-sm pixel-text text-gray-200">{activeGraveyard.name}</span>
          <span className="text-xs">▼</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowMenu(false)}
          />
          <div 
            className="absolute top-full right-0 mt-2 w-64 z-40 overflow-hidden"
            style={{
              clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)'
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/blackstone.webp"
                alt="Menu background"
                fill
                sizes="256px"
                className="object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>
            <div className="relative p-3 space-y-2 max-h-96 overflow-y-auto">
              {graveyards.map((graveyard) => (
                <div
                  key={graveyard.id}
                  className={`flex items-center justify-between p-2 rounded transition-all ${
                    graveyard.id === activeGraveyard.id
                      ? 'bg-purple-900 bg-opacity-50'
                      : 'hover:bg-gray-700 hover:bg-opacity-30'
                  }`}
                >
                  <button
                    onClick={() => handleSwitch(graveyard)}
                    className="flex-1 text-left"
                  >
                    <p className="text-sm pixel-text text-gray-200 truncate">
                      {graveyard.name}
                    </p>
                    <p className="text-xs pixel-text text-gray-400">
                      {THEMES.find(t => t.id === graveyard.theme)?.name || graveyard.theme}
                    </p>
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(graveyard)}
                      className="p-1 text-xs hover:text-gray-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    {graveyards.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(graveyard);
                        }}
                        className="p-1 text-xs hover:text-red-400"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setShowCreateForm(true);
                  setShowMenu(false);
                }}
                className="w-full p-2 text-sm pixel-text text-green-400 hover:text-green-300 text-left transition-all hover:bg-gray-700 hover:bg-opacity-30 rounded"
              >
                + Create New Graveyard
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <div 
            className="relative w-full max-w-md overflow-hidden"
            style={{
              clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/blackstone.webp"
                alt="Form background"
                fill
                sizes="500px"
                className="object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            <div className="relative p-6 space-y-4">
              <h3 className="text-xl pixel-text text-gray-100">Create New Graveyard</h3>
              
              <div>
                <label className="block text-sm pixel-text text-gray-300 mb-2">Graveyard Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-black bg-opacity-50 border-2 border-gray-600 text-white pixel-text text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter graveyard name"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm pixel-text text-gray-300 mb-2">Choose Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setNewTheme(theme.id)}
                      className={`relative h-24 rounded overflow-hidden border-2 transition-all ${
                        newTheme === theme.id
                          ? 'border-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={theme.image}
                        alt={theme.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="pixel-text text-white text-xs text-center px-1">
                          {theme.name}
                        </span>
                      </div>
                      {newTheme === theme.id && (
                        <div className="absolute top-1 right-1 text-lg">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white pixel-text text-sm"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newName.trim() || creating}
                  className="flex-1 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white pixel-text text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && editingGraveyard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <div 
            className="relative w-full max-w-md overflow-hidden"
            style={{
              clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/blackstone.webp"
                alt="Form background"
                fill
                sizes="500px"
                className="object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            <div className="relative p-6 space-y-4">
              <h3 className="text-xl pixel-text text-gray-100">Edit Graveyard</h3>
              
              <div>
                <label className="block text-sm pixel-text text-gray-300 mb-2">Graveyard Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-black bg-opacity-50 border-2 border-gray-600 text-white pixel-text text-sm focus:outline-none focus:border-gray-400"
                  placeholder="Enter graveyard name"
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm pixel-text text-gray-300 mb-2">Choose Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(theme => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setNewTheme(theme.id)}
                      className={`relative h-24 rounded overflow-hidden border-2 transition-all ${
                        newTheme === theme.id
                          ? 'border-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={theme.image}
                        alt={theme.name}
                        fill
                        sizes="200px"
                        className="object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="pixel-text text-white text-xs text-center px-1">
                          {theme.name}
                        </span>
                      </div>
                      {newTheme === theme.id && (
                        <div className="absolute top-1 right-1 text-lg">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingGraveyard(null);
                    setNewName('');
                    setNewTheme('stillwater');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white pixel-text text-sm"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  disabled={!newName.trim()}
                  className="flex-1 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white pixel-text text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && graveyardToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
          <div 
            className="relative w-full max-w-md overflow-hidden"
            style={{
              clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/blackstone.webp"
                alt="Form background"
                fill
                sizes="500px"
                className="object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            <div className="relative p-6 space-y-4">
              <h3 className="text-xl pixel-text text-red-400">Delete Graveyard</h3>
              
              <div className="space-y-2">
                <p className="text-sm pixel-text text-gray-300">
                  Are you sure you want to permanently delete{' '}
                  <span className="text-yellow-400 font-bold">"{graveyardToDelete.name}"</span>?
                </p>
                <p className="text-sm pixel-text text-red-400 font-bold">
                  ⚠️ All memorials in this graveyard will be permanently deleted!
                </p>
                <p className="text-xs pixel-text text-gray-400">
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setGraveyardToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white pixel-text text-sm"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-700 hover:bg-red-600 text-white pixel-text text-sm"
                  style={{
                    clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
                  }}
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
