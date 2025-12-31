'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
      {/* Header Nav */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-graveyard-dark bg-opacity-90 border-b-2 border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg md:text-xl pixel-text text-gray-200">
            👤 {profile?.email}
          </h2>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowForm(true)}
              className="pixel-border px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white pixel-text text-sm transition-all"
            >
              + Add Memorial
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="pixel-border px-4 py-2 bg-graveyard-night hover:bg-gray-800 text-white pixel-text text-sm transition-all"
              >
                Profile ▾
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-graveyard-night border-2 border-gray-700 rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-800 text-white pixel-text text-xs transition-all border-b border-gray-700"
                  >
                    Sign Out
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleDeleteAccount();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-900 text-red-400 pixel-text text-xs transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen overflow-hidden pt-16">
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
