import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
