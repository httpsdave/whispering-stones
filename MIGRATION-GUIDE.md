# Multiple Graveyards Migration Guide

## Overview
This migration adds support for multiple graveyards per user. Each user can create, manage, and switch between different graveyards, each with its own theme and set of memorials.

## Database Migration Steps

1. **Navigate to your Supabase project**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Execute the migration**
   - Copy the entire contents of `supabase-migration-graveyards.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute

## What This Migration Does

### 1. Creates `graveyards` table
- `id`: Primary key (UUID)
- `user_id`: Foreign key to auth.users
- `name`: Graveyard name (max 100 characters)
- `theme`: Graveyard theme (stillwater, moonlit, eternal, forgotten)
- `is_active`: Boolean indicating the currently active graveyard
- `created_at` and `updated_at`: Timestamps

### 2. Updates `deceased` table
- Adds `graveyard_id` column (foreign key to graveyards)
- Creates index on `graveyard_id` for better query performance

### 3. Sets up Row Level Security (RLS)
- Users can only view/manage their own graveyards
- Users can only view/manage deceased in their own graveyards

### 4. Creates trigger
- Ensures each user has exactly ONE active graveyard at a time
- Automatically deactivates other graveyards when setting a new active one

### 5. Migrates existing data
- Creates a default graveyard for each existing user
- Copies `graveyard_name` and `graveyard_theme` from `profiles` table
- Links all existing memorials to the new default graveyard

## Verification

After running the migration, verify it worked:

```sql
-- Check graveyards table
SELECT * FROM graveyards;

-- Check deceased table has graveyard_id
SELECT id, name, graveyard_id FROM deceased LIMIT 5;

-- Verify RLS policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('graveyards', 'deceased');
```

## Rollback (if needed)

If you need to rollback the migration:

```sql
-- Remove the trigger
DROP TRIGGER IF EXISTS ensure_single_active_graveyard ON graveyards;
DROP FUNCTION IF EXISTS ensure_single_active_graveyard();

-- Drop the foreign key and column from deceased
ALTER TABLE deceased DROP COLUMN IF EXISTS graveyard_id;

-- Drop the graveyards table
DROP TABLE IF EXISTS graveyards;
```

## Features After Migration

Users will be able to:
- ✅ Create multiple graveyards with different names and themes
- ✅ Switch between graveyards using the dropdown in the top-right
- ✅ Each graveyard maintains its own set of memorials
- ✅ Edit graveyard name and theme
- ✅ Delete graveyards (and all associated memorials)
- ✅ One active graveyard at a time

## Notes

- The migration is idempotent - it can be run multiple times safely
- Existing users will automatically get a default graveyard with their current settings
- The `profiles` table columns (`graveyard_name`, `graveyard_theme`) are kept for backward compatibility but are no longer used by the app
