'use client';

import React from 'react';
import Image from 'next/image';
import Tombstone from './Tombstone';
import type { Deceased } from '@/types';

interface GraveyardProps {
  deceased: Deceased[];
  onTombstoneClick: (deceased: Deceased) => void;
  graveyardName?: string;
  graveyardTheme?: string;
}

const themeImages: Record<string, string> = {
  stillwater: '/graveyarddesign1.gif',
  unremembered: '/graveyarddesign2.gif',
  'final-meadow': '/graveyarddesign3.gif',
  'sunset-ridge': '/graveyarddesign4.gif',
  'thunders-reach': '/graveyarddesign5.gif'
};

const themeNames: Record<string, string> = {
  stillwater: 'Stillwater Grounds',
  unremembered: 'Unremembered Grove',
  'final-meadow': 'Final Meadow',
  'sunset-ridge': 'Sunset Ridge',
  'thunders-reach': "Thunder's Reach"
};

export default function Graveyard({ deceased, onTombstoneClick, graveyardName, graveyardTheme = 'stillwater' }: GraveyardProps) {
  const backgroundImage = themeImages[graveyardTheme] || themeImages.stillwater;
  const displayName = graveyardName || themeNames[graveyardTheme] || 'My Graveyard';

  return (
    <div className="h-full relative overflow-hidden">
      {/* Theme Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Graveyard background"
          fill
          className="object-cover"
          style={{ imageRendering: 'pixelated' }}
          priority
          unoptimized
        />
      </div>
      {/* Header */}
      <div className="relative z-10 text-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl pixel-text text-gray-200 mb-2">
          {displayName}
        </h1>
        <p className="text-sm md:text-base pixel-text text-gray-400">
          🕊️ {deceased.length} {deceased.length === 1 ? 'soul' : 'souls'} at rest 🕊️
        </p>
      </div>

      {/* Graveyard Grid */}
      <div className="relative z-10 container mx-auto px-4 h-full overflow-y-auto pb-8">
        {deceased.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl md:text-2xl pixel-text text-gray-400">
              Your graveyard is empty...
            </p>
            <p className="text-sm md:text-base pixel-text text-gray-500 mt-4">
              Create your first memorial
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {deceased.map((person) => (
              <div key={person.id} className="flex justify-center">
                <Tombstone
                  style={person.tombstone_style as any}
                  name={person.name}
                  birthDate={person.birth_date}
                  deathDate={person.death_date}
                  epitaph={person.epitaph}
                  onClick={() => onTombstoneClick(person)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
