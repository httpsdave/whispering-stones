'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useDeceasedStore } from '@/store/deceasedStore';
import Graveyard from '@/components/Graveyard';
import DeceasedModal from '@/components/DeceasedModal';
import DeceasedForm from '@/components/DeceasedForm';
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

    const confirmText = 'DELETE';
    const userInput = prompt(
      `⚠️ WARNING: This will permanently delete your account and ALL memorials.\n\nType "${confirmText}" to confirm:`
    );

    if (userInput !== confirmText) {
      if (userInput !== null) {
        alert('Account deletion cancelled.');
      }
      return;
    }

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
      alert('Your account has been permanently deleted.');
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
        className="fixed top-4 left-4 z-50 p-2 transition-all hover:scale-110"
      >
        <div className="space-y-1">
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
                  setShowForm(true);
                }}
                className="w-full text-left px-4 py-3 text-green-700 hover:text-green-600 pixel-text text-base transition-all hover:scale-105"
              >
                + Add Memorial
              </button>

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
                  handleDeleteAccount();
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
    </>
  );
}
