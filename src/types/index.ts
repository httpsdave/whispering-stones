export type Deceased = {
  id: string;
  user_id: string;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  epitaph: string;
  notes: string | null;
  tombstone_style: number;
  position_x: number;
  position_y: number;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string;
  graveyard_name: string | null;
  created_at: string;
};

export type TombstoneStyle = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
