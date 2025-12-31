import { create } from 'zustand';
import { getSupabaseClient } from '@/lib/supabase';
import type { Deceased } from '@/types';

interface DeceasedState {
  deceased: Deceased[];
  loading: boolean;
  fetchDeceased: (userId: string) => Promise<void>;
  addDeceased: (deceased: Omit<Deceased, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateDeceased: (id: string, updates: Partial<Deceased>) => Promise<void>;
  deleteDeceased: (id: string) => Promise<void>;
}

export const useDeceasedStore = create<DeceasedState>((set, get) => ({
  deceased: [],
  loading: false,

  fetchDeceased: async (userId: string) => {
    set({ loading: true });
    const supabase = getSupabaseClient();
    try {
      const { data, error } = await supabase
        .from('deceased')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ deceased: data || [], loading: false });
    } catch (error) {
      console.error('Fetch deceased error:', error);
      set({ loading: false });
    }
  },

  addDeceased: async (deceased) => {
    const supabase = getSupabaseClient();
    const { data, error} = await supabase
      .from('deceased')
      .insert([deceased])
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      deceased: [data, ...state.deceased],
    }));
  },

  updateDeceased: async (id, updates) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('deceased')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    set((state) => ({
      deceased: state.deceased.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    }));
  },

  deleteDeceased: async (id) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from('deceased')
      .delete()
      .eq('id', id);

    if (error) throw error;

    set((state) => ({
      deceased: state.deceased.filter((d) => d.id !== id),
    }));
  },
}));
