'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useDeceasedStore } from '@/store/deceasedStore';
import Graveyard from '@/components/Graveyard';
import DeceasedModal from '@/components/DeceasedModal';
import DeceasedForm from '@/components/DeceasedForm';
import ConfirmationModal from '@/components/ConfirmationModal';
import type { Deceased } from '@/types';

export const dynamic = 'force-dynamic';

export default function GraveyardPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, initialize, signOut } = useAuthStore();
  const { deceased, loading: deceasedLoading, fetchDeceased, deleteDeceased } = useDeceasedStore();
  
  const [selectedDeceased, setSelectedDeceased] = useState<Deceased | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDeceased, setEditingDeceased] = useState<Deceased | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    } else if (user) {
      fetchDeceased(user.id);
    }
  }, [user, authLoading, router, fetchDeceased]);

  const handleTombstoneClick = (deceased: Deceased) => {
    setSelectedDeceased(deceased);
    setShowModal(true);
  };

  const handleEdit = () => {
    if (selectedDeceased) {
      setEditingDeceased(selectedDeceased);
      setShowModal(false);
      setShowForm(true);
    }
  };

  const handleDelete = async () => {
    if (selectedDeceased && confirm('Are you sure you want to remove this memorial?')) {
      try {
        await deleteDeceased(selectedDeceased.id);
        setShowModal(false);
        setSelectedDeceased(null);
      } catch (error) {
        alert('Failed to delete memorial');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDeceased(null);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      // Call server-side API to permanently delete account
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Sign out and redirect
      await signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Delete account error:', error);
      alert('Failed to delete account: ' + error.message);
    }
  };

  if (authLoading || deceasedLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graveyard-dark">
        <p className="text-xl pixel-text text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-6 left-4 z-50 p-3 transition-all hover:scale-110 overflow-hidden"
        style={{
          clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)'
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/blackstone.webp"
            alt="Stone texture"
            fill
            sizes="48px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative space-y-1">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-gray-300"></div>
          <div className="w-6 h-1 bg-gray-400"></div>
        </div>
      </button>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-50 transition-transform duration-500 ease-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
        }}
      >
        <div className="relative h-full">
          {/* Sidebar Background */}
          <div className="absolute inset-0">
            <Image
              src="/blackstone.webp"
              alt="Stone texture"
              fill
              sizes="320px"
              className="object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Sidebar Content */}
          <div className="relative h-full flex flex-col p-6 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setShowSidebar(false)}
              className="self-end text-white text-2xl hover:text-gray-300 transition-all"
            >
              ×
            </button>

            {/* User Info */}
            <div className="border-b-2 border-gray-600 pb-4">
              <div className="text-2xl mb-2">👤</div>
              <p className="pixel-text text-gray-200 text-xs break-all">
                {profile?.email}
              </p>
              <p className="pixel-text text-gray-400 text-xs mt-2">
                {profile?.graveyard_name}
              </p>
            </div>

            {/* Menu Items */}
            <div className="flex-1 space-y-4">
              <button
                onClick={() => {
                  setShowSidebar(false);
                  handleSignOut();
                }}
                className="w-full text-left px-4 py-3 text-white hover:text-gray-300 pixel-text text-base transition-all hover:scale-105"
              >
                Sign Out
              </button>

              <button
                onClick={() => {
                  setShowSidebar(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full text-left px-4 py-3 pixel-text text-base transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(to bottom, #dc2626 0%, #dc2626 25%, #991b1b 25%, #991b1b 50%, #7f1d1d 50%, #7f1d1d 75%, #991b1b 75%, #991b1b 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '100% 8px'
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen overflow-hidden">
        <Graveyard
          deceased={deceased}
          onTombstoneClick={handleTombstoneClick}
          graveyardName={profile?.graveyard_name || undefined}
          graveyardTheme={profile?.graveyard_theme || 'stillwater'}
        />
      </div>

      <DeceasedModal
        deceased={selectedDeceased}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeceasedForm
        isOpen={showForm}
        onClose={handleFormClose}
        deceased={editingDeceased}
        userId={user.id}
      />

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        confirmText="DELETE"
        requiresTyping={true}
        confirmButtonText="Delete Forever"
        cancelButtonText="Cancel"
        isDangerous={true}
      >
        <div className="text-sm md:text-base pixel-text leading-relaxed space-y-3">
          <p className="text-gray-300">
            <span className="text-yellow-400 font-bold">WARNING:</span> This will permanently delete your account and <span className="text-yellow-400 font-bold">ALL</span> memorials.
          </p>
          <p className="text-red-500 font-bold">
            This action cannot be undone!
          </p>
        </div>
      </ConfirmationModal>

      {/* Floating Add Button */}
      <div className="fixed bottom-10 right-10 z-40 group">
        <button
          onClick={() => setShowForm(true)}
          className="w-14 h-14 md:w-16 md:h-16 transition-all hover:scale-110 overflow-hidden shadow-lg relative"
        >
          <div className="absolute inset-0">
            <Image
              src="/blackstone.webp"
              alt="Stone texture"
              fill
              sizes="64px"
              className="object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="relative flex items-center justify-center h-full">
            <span className="text-4xl md:text-5xl text-white font-bold leading-none" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>+</span>
          </div>
        </button>
        
        {/* Pixelated Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div 
            className="relative overflow-hidden"
            style={{
              clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/blackstone.webp"
                alt="Tooltip background"
                fill
                sizes="150px"
                className="object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            <div className="relative px-3 py-2">
              <p className="text-xs pixel-text text-gray-200 whitespace-nowrap">Add Memorial</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
