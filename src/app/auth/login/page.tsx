'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/graveyard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-2">
            <Image
              src="/crow.gif"
              alt="Pixel crow"
              width={80}
              height={80}
              style={{ imageRendering: 'pixelated' }}
              className="object-contain mb-2"
              unoptimized
            />
            <h1 className="text-3xl md:text-4xl pixel-text text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Welcome Back
            </h1>
          </div>
          <p className="text-xs md:text-sm pixel-text text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Enter your memorial garden
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
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-input text-xs text-gray-100 focus:outline-none focus:border-teal-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs pixel-label text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-input text-xs text-gray-100 focus:outline-none focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white hover:text-gray-300 disabled:text-gray-600 pixel-text text-lg transition-all hover:scale-105 active:scale-95"
          >
            {loading ? 'Entering...' : 'Enter Graveyard'}
          </button>

          <p className="text-center text-xs pixel-text text-gray-300 mt-4">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-teal-400 hover:text-teal-300">
              Create One
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
