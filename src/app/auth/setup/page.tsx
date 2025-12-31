'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default function SetupPage() {
  const router = useRouter();
  const [graveyardName, setGraveyardName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setUser(user);

    // Check if graveyard name already set, redirect to customize
    const { data: profile } = await supabase
      .from('profiles')
      .select('graveyard_name')
      .eq('id', user.id)
      .single();

    if (profile?.graveyard_name) {
      router.push('/graveyard');
    } else {
      // Redirect to customize page for theme selection
      router.push('/auth/customize');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ graveyard_name: graveyardName || 'My Graveyard' })
        .eq('id', user.id);

      if (updateError) throw updateError;

      router.push('/graveyard');
    } catch (err: any) {
      setError(err.message || 'Failed to save graveyard name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/graveyard3.gif"
          alt="Pixel art graveyard"
          fill
          className="object-cover scale-150"
          style={{ imageRendering: 'pixelated', objectPosition: '20% center' }}
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-2">
            <Image
              src="/doveleft.gif"
              alt="Pixel dove"
              width={160}
              height={160}
              style={{ imageRendering: 'pixelated' }}
              className="object-contain -mb-6"
              unoptimized
            />
            <h1 className="text-3xl md:text-4xl pixel-text text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Name Your Graveyard
            </h1>
          </div>
          <p className="text-xs md:text-sm pixel-text text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Give your memorial garden a name
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-900 border-2 border-red-700 rounded text-xs pixel-text text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs pixel-label text-gray-300 mb-2">
              Graveyard Name (optional)
            </label>
            <input
              type="text"
              value={graveyardName}
              onChange={(e) => setGraveyardName(e.target.value)}
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-input text-xs text-gray-100 focus:outline-none focus:border-teal-500"
              placeholder="Eternal Gardens"
            />
            <p className="text-xs pixel-text text-gray-400 mt-2">
              Leave blank to use "My Graveyard"
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white hover:text-gray-300 disabled:text-gray-600 pixel-text text-lg transition-all hover:scale-105 active:scale-95"
          >
            {loading ? 'Creating...' : 'Create Graveyard'}
          </button>
        </form>
      </div>
    </div>
  );
}
