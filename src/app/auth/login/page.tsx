'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-graveyard-dark via-graveyard-night to-graveyard-purple">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl pixel-text text-gray-100 mb-2">
            🕊️ Welcome Back
          </h1>
          <p className="text-base pixel-text text-gray-400">
            Enter your memorial garden
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-graveyard-night border-4 border-gray-700 rounded-lg p-6 md:p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-900 border-2 border-red-700 rounded text-sm pixel-text text-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm pixel-text text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-gray-100 focus:outline-none focus:border-purple-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm pixel-text text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-text text-gray-100 focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full pixel-border px-4 py-4 bg-purple-900 hover:bg-purple-800 disabled:bg-gray-700 text-white pixel-text text-lg transition-all"
          >
            {loading ? 'Entering...' : 'Enter Graveyard'}
          </button>

          <p className="text-center text-sm pixel-text text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300">
              Create One
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
