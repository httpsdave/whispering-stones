# Whispering Stones 🕊️

A beautiful 8-bit pixel art digital memorial graveyard where you can honor and remember the departed.

## Features

- **8-bit Pixel Art Design** - Nostalgic retro aesthetic inspired by classic games
- **8 Unique Tombstone Styles** - Choose from various memorial designs
- **Custom Epitaphs** - Personalize the text on each tombstone
- **Detailed Memories** - Add longer notes and memories for each person
- **Personal Graveyards** - Each user has their own memorial garden
- **Mobile-First Responsive** - Works beautifully on all devices
- **User Authentication** - Secure accounts with Supabase

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works perfectly)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd WhisperingStones
   npm install
   ```

2. **Set up Supabase**
   
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Go to Project Settings > API
   - Copy your project URL and anon/public key

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   - In your Supabase project, go to SQL Editor
   - Copy the contents of `supabase-schema.sql`
   - Run the SQL script to create tables and policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
WhisperingStones/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── graveyard/         # Main graveyard view
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── Tombstone.tsx      # Individual tombstone
│   │   ├── TombstonePicker.tsx# Style selector
│   │   ├── Graveyard.tsx      # Main graveyard display
│   │   ├── DeceasedModal.tsx  # View deceased details
│   │   └── DeceasedForm.tsx   # Add/edit form
│   ├── lib/                   # Utilities
│   │   ├── supabase.ts        # Supabase client
│   │   └── database.types.ts  # Database types
│   ├── store/                 # State management
│   │   ├── authStore.ts       # Auth state
│   │   └── deceasedStore.ts   # Deceased data
│   └── types/                 # TypeScript types
│       └── index.ts
├── supabase-schema.sql        # Database schema
└── package.json
```

## Database Schema

### Tables

**profiles**
- `id` - User ID (references auth.users)
- `email` - User email
- `graveyard_name` - Custom graveyard name
- `created_at` - Account creation date

**deceased**
- `id` - Unique memorial ID
- `user_id` - Owner's user ID
- `name` - Name of deceased
- `birth_date` - Birth date (optional)
- `death_date` - Death date (optional)
- `epitaph` - Tombstone text (max 100 chars)
- `notes` - Detailed memories (max 1000 chars)
- `tombstone_style` - Design choice (1-8)
- `position_x/y` - Position in graveyard
- `created_at` - Memorial creation date
- `updated_at` - Last update date

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Customization

### Adding More Tombstone Styles

Edit [src/components/Tombstone.tsx](src/components/Tombstone.tsx) and [src/components/TombstonePicker.tsx](src/components/TombstonePicker.tsx) to add more styles.

### Changing Colors

Edit [tailwind.config.ts](tailwind.config.ts) to customize the color scheme.

### Background Elements

Modify [src/components/Graveyard.tsx](src/components/Graveyard.tsx) to add trees, fences, or other decorative elements.

## License

MIT - Feel free to use for personal or commercial projects.

## Credits

Inspired by classic 8-bit adventure games and memorial websites.

---

**Rest in Pixels** 🌙
