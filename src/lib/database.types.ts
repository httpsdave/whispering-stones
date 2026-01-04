export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          graveyard_name: string | null
          graveyard_theme: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          graveyard_name?: string | null
          graveyard_theme?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          graveyard_name?: string | null
          graveyard_theme?: string | null
          created_at?: string
        }
      }
      graveyards: {
        Row: {
          id: string
          user_id: string
          name: string
          theme: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          theme: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          theme?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      deceased: {
        Row: {
          id: string
          user_id: string
          graveyard_id: string
          name: string
          birth_date: string | null
          death_date: string | null
          epitaph: string
          notes: string | null
          tombstone_style: number
          position_x: number
          position_y: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          graveyard_id: string
          name: string
          birth_date?: string | null
          death_date?: string | null
          epitaph: string
          notes?: string | null
          tombstone_style: number
          position_x: number
          position_y: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          graveyard_id?: string
          name?: string
          birth_date?: string | null
          death_date?: string | null
          epitaph?: string
          notes?: string | null
          tombstone_style?: number
          position_x?: number
          position_y?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
