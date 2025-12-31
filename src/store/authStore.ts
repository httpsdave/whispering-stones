import { create } from 'zustand';
import { getSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, graveyardName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: async () => {
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        set({ user, profile, loading: false });
      } else {
        set({ user: null, profile: null, loading: false });
      }
    } catch (error) {
      console.error('Initialize error:', error);
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string, graveyardName?: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user && graveyardName) {
      await supabase
        .from('profiles')
        .update({ graveyard_name: graveyardName } as any)
        .eq('id', data.user.id);
    }

    await get().initialize();
  },

  signIn: async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    await get().initialize();
  },

  signOut: async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const { user } = get();
    if (!user) throw new Error('Not authenticated');

    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;

    await get().initialize();
  },
}));
