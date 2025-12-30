'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useDeceasedStore } from '@/store/deceasedStore';
import Graveyard from '@/components/Graveyard';
import DeceasedModal from '@/components/DeceasedModal';
import DeceasedForm from '@/components/DeceasedForm';
import type { Deceased } from '@/types';

export default function GraveyardPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, initialize, signOut } = useAuthStore();
  const { deceased, loading: deceasedLoading, fetchDeceased, deleteDeceased } = useDeceasedStore();
  
  const [selectedDeceased, setSelectedDeceased] = useState<Deceased | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingDeceased, setEditingDeceased] = useState<Deceased | null>(null);

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
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="pixel-border px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white pixel-text text-sm transition-all"
            >
              + Add Memorial
            </button>
            <button
              onClick={handleSignOut}
              className="pixel-border px-4 py-2 bg-graveyard-night hover:bg-gray-800 text-white pixel-text text-sm transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16">
        <Graveyard
          deceased={deceased}
          onTombstoneClick={handleTombstoneClick}
          graveyardName={profile?.graveyard_name || undefined}
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
