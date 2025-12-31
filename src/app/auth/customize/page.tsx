'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const themes = [
  {
    id: 'stillwater',
    name: 'Stillwater Grounds',
    image: '/graveyarddesign1.gif'
  },
  {
    id: 'unremembered',
    name: 'Unremembered Grove',
    image: '/graveyarddesign2.gif'
  },
  {
    id: 'final-meadow',
    name: 'Final Meadow',
    image: '/graveyarddesign3.gif'
  },
  {
    id: 'sunset-ridge',
    name: 'Sunset Ridge',
    image: '/graveyarddesign4.gif'
  },
  {
    id: 'thunders-reach',
    name: "Thunder's Reach",
    image: '/graveyarddesign5.gif'
  }
];

export default function CustomizePage() {
  const router = useRouter();
  const { user, profile, loading, updateProfile } = useAuthStore();
  const [selectedTheme, setSelectedTheme] = useState('stillwater');
  const [graveyardName, setGraveyardName] = useState('Stillwater Grounds');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    } else if (profile?.graveyard_name && profile?.graveyard_theme) {
      // Already customized, go to graveyard
      router.push('/graveyard');
    }
  }, [user, profile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const selectedThemeName = themes.find(t => t.id === selectedTheme)?.name || 'Stillwater Grounds';
      await updateProfile({
        graveyard_name: graveyardName || selectedThemeName,
        graveyard_theme: selectedTheme
      });
      router.push('/graveyard');
    } catch (error) {
      console.error('Failed to save customization:', error);
      alert('Failed to save your graveyard customization');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-graveyard-night">
        <p className="pixel-text text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/graveyard3.gif"
          alt="Background"
          fill
          className="object-cover opacity-50"
          style={{ imageRendering: 'pixelated' }}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl pixel-text text-white mb-4">
            Customize Your Graveyard
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="pixel-label block mb-4">
              Choose Your Theme
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    setGraveyardName(theme.name);
                  }}
                  className={`relative h-40 rounded overflow-hidden border-4 transition-all ${
                    selectedTheme === theme.id
                      ? 'border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.8)]'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    className="object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="pixel-text text-white text-sm">
                      {theme.name}
                    </span>
                  </div>
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 text-2xl">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Graveyard Name */}
          <div>
            <label className="pixel-label block mb-2">
              Name Your Graveyard (Optional)
            </label>
            <input
              type="text"
              value={graveyardName}
              onChange={(e) => setGraveyardName(e.target.value)}
              placeholder={themes.find(t => t.id === selectedTheme)?.name || 'Stillwater Grounds'}
              className="pixel-input w-full bg-gray-800 text-gray-200"
              maxLength={50}
            />
            <p className="text-xs text-gray-400 mt-2 pixel-text">
              Leave blank to use the theme name
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-white pixel-text text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Enter Graveyard'}
          </button>
        </form>
      </div>
    </div>
  );
}
