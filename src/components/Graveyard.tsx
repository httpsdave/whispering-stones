'use client';

import React, { useState, useEffect } from 'react';
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

// Desktop positions (10 spots)
const stillwaterDesktopPositions = [
  { x: 10, y: 72, scale: 1 },
  { x: 20, y: 74, scale: 0.95 },
  { x: 32, y: 73, scale: 1 },
  { x: 68, y: 72, scale: 0.95 },
  { x: 78, y: 74, scale: 1 },
  { x: 88, y: 73, scale: 0.9 },
  { x: 25, y: 75, scale: 0.9 },
  { x: 42, y: 74, scale: 0.85 },
  { x: 58, y: 74, scale: 0.85 },
  { x: 74, y: 75, scale: 0.9 },
];

// Mobile landscape positions (5 spots, more spread out)
const stillwaterMobilePositions = [
  { x: 12, y: 62, scale: 0.7 },
  { x: 30, y: 64, scale: 0.65 },
  { x: 50, y: 63, scale: 0.7 },
  { x: 70, y: 64, scale: 0.65 },
  { x: 88, y: 62, scale: 0.7 },
];

export default function Graveyard({ deceased, onTombstoneClick, graveyardName, graveyardTheme = 'stillwater' }: GraveyardProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  
  useEffect(() => {
    const checkMobileLandscape = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isSmallHeight = window.innerHeight < 500;
      setIsMobileLandscape(isLandscape && isSmallHeight);
    };
    
    checkMobileLandscape();
    window.addEventListener('resize', checkMobileLandscape);
    return () => window.removeEventListener('resize', checkMobileLandscape);
  }, []);
  
  const backgroundImage = themeImages[graveyardTheme] || themeImages.stillwater;
  const displayName = graveyardName || themeNames[graveyardTheme] || 'My Graveyard';
  
  const isStillwater = graveyardTheme === 'stillwater';
  
  // Use different positions and limits based on screen
  const positions = isMobileLandscape ? stillwaterMobilePositions : stillwaterDesktopPositions;
  const tombstonesPerScene = positions.length;
  const totalScenes = isStillwater ? Math.ceil(deceased.length / tombstonesPerScene) : 1;
  
  // Get tombstones for current scene
  const getVisibleDeceased = () => {
    if (!isStillwater) return deceased;
    const start = currentScene * tombstonesPerScene;
    return deceased.slice(start, start + tombstonesPerScene);
  };
  
  const visibleDeceased = getVisibleDeceased();

  const nextScene = () => {
    if (currentScene < totalScenes - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

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
      <div className="relative z-10 text-center py-4 mt-12 px-4">
        <h1 className="text-3xl md:text-5xl pixel-text text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 4px 4px 8px rgba(0, 0, 0, 0.6)' }}>
          {displayName}
        </h1>
        <p className="text-sm md:text-base pixel-text text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
          🕊️ {deceased.length} {deceased.length === 1 ? 'soul' : 'souls'} at rest 🕊️
        </p>
      </div>

      {/* Stillwater Ground-Based Layout */}
      {isStillwater && deceased.length > 0 && (
        <div className="absolute inset-0 z-10">
          {visibleDeceased.map((person, index) => {
            const position = positions[index % positions.length];
            return (
              <div
                key={person.id}
                className="absolute transform -translate-x-1/2"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translateX(-50%) scale(${position.scale})`,
                  zIndex: Math.floor(position.y),
                }}
              >
                <Tombstone
                  style={person.tombstone_style as any}
                  name={person.name}
                  birthDate={person.birth_date}
                  deathDate={person.death_date}
                  epitaph={person.epitaph}
                  onClick={() => onTombstoneClick(person)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Scene Navigation for Stillwater */}
      {isStillwater && totalScenes > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevScene}
            disabled={currentScene === 0}
            className={`pixel-text text-white px-4 py-2 transition-all ${
              currentScene === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:scale-110 hover:text-gray-300'
            }`}
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            ◀ Prev
          </button>
          <span 
            className="pixel-text text-white text-sm"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            Scene {currentScene + 1} / {totalScenes}
          </span>
          <button
            onClick={nextScene}
            disabled={currentScene === totalScenes - 1}
            className={`pixel-text text-white px-4 py-2 transition-all ${
              currentScene === totalScenes - 1 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:scale-110 hover:text-gray-300'
            }`}
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            Next ▶
          </button>
        </div>
      )}

      {/* Default Grid Layout for Other Themes */}
      {!isStillwater && (
        <div className="relative z-10 container mx-auto px-4 h-full overflow-hidden pb-8">
          {deceased.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl md:text-2xl pixel-text text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
                Your graveyard is empty...
              </p>
              <p className="text-sm md:text-base pixel-text text-gray-200 mt-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
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
      )}

      {/* Empty state for Stillwater */}
      {isStillwater && deceased.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl md:text-2xl pixel-text text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
              Your graveyard is empty...
            </p>
            <p className="text-sm md:text-base pixel-text text-gray-200 mt-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
              Create your first memorial
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
