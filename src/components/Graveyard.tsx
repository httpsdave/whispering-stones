'use client';

import React, { useState } from 'react';
import Tombstone from './Tombstone';
import type { Deceased } from '@/types';

interface GraveyardProps {
  deceased: Deceased[];
  onTombstoneClick: (deceased: Deceased) => void;
  graveyardName?: string;
}

export default function Graveyard({ deceased, onTombstoneClick, graveyardName }: GraveyardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-graveyard-night via-graveyard-purple to-graveyard-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-graveyard-grass" />
      </div>

      {/* Moon */}
      <div className="absolute top-8 right-8 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-100 opacity-70" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8 px-4">
        <h1 className="text-3xl md:text-5xl pixel-text text-gray-200 mb-2">
          {graveyardName || 'My Graveyard'}
        </h1>
        <p className="text-sm md:text-base pixel-text text-gray-400">
          🕊️ {deceased.length} {deceased.length === 1 ? 'soul' : 'souls'} at rest 🕊️
        </p>
      </div>

      {/* Graveyard Grid */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
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

      {/* Ground effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
