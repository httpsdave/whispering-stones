import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-graveyard-dark via-graveyard-night to-graveyard-purple">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl md:text-7xl pixel-text text-gray-100 mb-4">
          ⚰️ Whispering Stones
        </h1>
        <p className="text-xl md:text-2xl pixel-text text-gray-300">
          A Digital Memorial Garden
        </p>
        <p className="text-base md:text-lg text-gray-400 max-w-md mx-auto">
          Create your own 8-bit pixel art graveyard. Honor the departed with customizable tombstones and eternal memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link 
            href="/auth/signup"
            className="pixel-border px-8 py-4 bg-graveyard-purple hover:bg-purple-900 text-white pixel-text text-lg transition-all"
          >
            Create Graveyard
          </Link>
          <Link 
            href="/auth/login"
            className="pixel-border px-8 py-4 bg-graveyard-night hover:bg-gray-800 text-white pixel-text text-lg transition-all"
          >
            Enter
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500 pixel-text">
          🌙 Rest in Pixels 🌙
        </div>
      </div>
    </main>
  );
}
