'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Check for duplicate email error
        if (signUpError.message.includes('already registered') || 
            signUpError.message.includes('User already registered')) {
          setError('This email is already registered. Please sign in instead.');
        } else {
          setError(signUpError.message);
        }
        setLoading(false);
        return;
      }

      // Show success message about email verification
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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

        <div className="relative z-10 w-full max-w-md text-center p-6 md:p-8">
          <div className="flex flex-col items-center mb-6">
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
              Check Your Email
            </h1>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm pixel-text text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              We've sent a confirmation link to
            </p>
            <p className="text-sm pixel-text text-teal-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {email}
            </p>
            <p className="text-xs pixel-text text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-4">
              Click the link in the email to verify your account, then you can set up your graveyard.
            </p>
            
            <Link 
              href="/auth/login"
              className="inline-block mt-6 py-4 text-teal-400 hover:text-teal-300 pixel-text text-sm transition-all hover:scale-105"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              src="/doveleft.gif"
              alt="Pixel dove"
              width={160}
              height={160}
              style={{ imageRendering: 'pixelated' }}
              className="object-contain -mb-6"
              unoptimized
            />
            <h1 className="text-3xl md:text-4xl pixel-text text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Join Us
            </h1>
          </div>
          <p className="text-xs md:text-sm pixel-text text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Create your eternal memorial garden
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
              minLength={6}
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-input text-xs text-gray-100 focus:outline-none focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs pixel-label text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-graveyard-dark border-2 border-gray-600 rounded pixel-input text-xs text-gray-100 focus:outline-none focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white hover:text-gray-300 disabled:text-gray-600 pixel-text text-lg transition-all hover:scale-105 active:scale-95"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-xs pixel-text text-gray-300 mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-teal-400 hover:text-teal-300">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
