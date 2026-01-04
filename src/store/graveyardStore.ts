import { create } from 'zustand';
import { getSupabaseClient } from '@/lib/supabase';

export interface Graveyard {
  id: string;
  user_id: string;
  name: string;
  theme: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface GraveyardState {
  graveyards: Graveyard[];
  activeGraveyard: Graveyard | null;
  loading: boolean;
  fetchGraveyards: (userId: string) => Promise<void>;
  createGraveyard: (userId: string, name: string, theme: string) => Promise<void>;
  setActiveGraveyard: (graveyardId: string) => Promise<void>;
  updateGraveyard: (graveyardId: string, updates: Partial<Graveyard>) => Promise<void>;
  deleteGraveyard: (graveyardId: string) => Promise<void>;
}

export const useGraveyardStore = create<GraveyardState>((set, get) => ({
  graveyards: [],
  activeGraveyard: null,
  loading: false,

  fetchGraveyards: async (userId: string) => {
    set({ loading: true });
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('graveyards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const active = data?.find(g => g.is_active) || data?.[0] || null;
      set({ graveyards: data || [], activeGraveyard: active, loading: false });
    } catch (error) {
      console.error('Fetch graveyards error:', error);
      set({ loading: false });
    }
  },

  createGraveyard: async (userId: string, name: string, theme: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('graveyards')
      .insert([{ user_id: userId, name, theme, is_active: false }])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      graveyards: [data, ...state.graveyards],
    }));
  },

  setActiveGraveyard: async (graveyardId: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('graveyards')
      .update({ is_active: true, updated_at: new Date().toISOString() })
      .eq('id', graveyardId);

    if (error) throw error;

    set((state) => ({
      graveyards: state.graveyards.map(g => ({
        ...g,
        is_active: g.id === graveyardId
      })),
      activeGraveyard: state.graveyards.find(g => g.id === graveyardId) || null,
    }));
  },

  updateGraveyard: async (graveyardId: string, updates: Partial<Graveyard>) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('graveyards')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', graveyardId);

    if (error) throw error;

    set((state) => ({
      graveyards: state.graveyards.map(g =>
        g.id === graveyardId ? { ...g, ...updates } : g
      ),
      activeGraveyard: state.activeGraveyard?.id === graveyardId
        ? { ...state.activeGraveyard, ...updates }
        : state.activeGraveyard,
    }));
  },

  deleteGraveyard: async (graveyardId: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('graveyards')
      .delete()
      .eq('id', graveyardId);

    if (error) throw error;

    set((state) => {
      const remaining = state.graveyards.filter(g => g.id !== graveyardId);
      const newActive = state.activeGraveyard?.id === graveyardId
        ? remaining[0] || null
        : state.activeGraveyard;

      return {
        graveyards: remaining,
        activeGraveyard: newActive,
      };
    });
  },
}));
