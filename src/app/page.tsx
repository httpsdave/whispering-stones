'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ensureAudioPlaying = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {
      console.log('Audio playback still blocked');
    });
  };

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/bgm1.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%
    audioRef.current = audio;

    // Try to play audio (may be blocked by browser autoplay policy)
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log('Autoplay blocked - user interaction required');
      }
    };

    playAudio();

    const handleFirstInteraction = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        document.removeEventListener('pointerdown', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      } catch (error) {
        console.log('Playback blocked after interaction');
      }
    };

    document.addEventListener('pointerdown', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    // Cleanup
    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('pointerdown', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        ensureAudioPlaying();
      }
      return next;
    });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/graveyard2.gif"
          alt="Pixel art graveyard"
          fill
          className="object-cover"
          style={{ imageRendering: 'pixelated', objectPosition: '20% center' }}
          priority
          unoptimized
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-2 transition-all hover:scale-110 overflow-hidden"
        style={{
          clipPath: 'polygon(2px 0, calc(100% - 2px) 0, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 0 calc(100% - 2px), 0 2px)'
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        <div className="absolute inset-0">
          <Image
            src="/blackstone.webp"
            alt="Stone texture"
            fill
            sizes="48px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative w-6 h-6 flex items-center justify-center">
          {isMuted ? (
            // Muted icon (speaker with X)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
              <rect x="4" y="9" width="3" height="6" fill="currentColor" style={{ imageRendering: 'pixelated' }} />
              <polygon points="7,9 11,6 11,18 7,15" fill="currentColor" style={{ imageRendering: 'pixelated' }} />
              <line x1="16" y1="9" x2="20" y2="13" stroke="currentColor" strokeWidth="2" style={{ imageRendering: 'pixelated' }} />
              <line x1="20" y1="9" x2="16" y2="13" stroke="currentColor" strokeWidth="2" style={{ imageRendering: 'pixelated' }} />
            </svg>
          ) : (
            // Unmuted icon (speaker with waves)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-300">
              <rect x="4" y="9" width="3" height="6" fill="currentColor" style={{ imageRendering: 'pixelated' }} />
              <polygon points="7,9 11,6 11,18 7,15" fill="currentColor" style={{ imageRendering: 'pixelated' }} />
              <path d="M15,9 Q17,12 15,15" stroke="currentColor" strokeWidth="2" fill="none" style={{ imageRendering: 'pixelated' }} />
              <path d="M17,7 Q20,12 17,17" stroke="currentColor" strokeWidth="2" fill="none" style={{ imageRendering: 'pixelated' }} />
            </svg>
          )}
        </div>
      </button>

      {/* Content */}
      <div className="relative z-10 text-center space-y-12 max-w-2xl">
        <div className="space-y-2">
          <div className="flex justify-center -mb-4">
            <Image
              src="/coffin1.png"
              alt="Pixel coffin"
              width={120}
              height={120}
              style={{ imageRendering: 'pixelated' }}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl pixel-text text-gray-100 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            Whispering Stones
          </h1>
          <p className="text-sm md:text-base pixel-text text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            A Digital Memorial Garden
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Link 
            href="/auth/signup"
            className="relative px-6 py-3 overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{
              clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)'
            }}
          >
            <Image
              src="/mossystone.jpg"
              alt="Mossy stone"
              fill
              className="object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="relative z-10 text-white pixel-text text-base drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              Create Graveyard
            </span>
          </Link>
          <Link 
            href="/auth/login"
            className="py-4 text-white hover:text-gray-300 pixel-text text-lg transition-all hover:scale-105 active:scale-95"
          >
            Enter
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-300 pixel-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Rest in Pixels
        </div>
      </div>
    </main>
  );
}
