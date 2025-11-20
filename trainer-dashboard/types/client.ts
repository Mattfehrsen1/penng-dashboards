export interface Client {
  id: string;
  user_id: string;
  trainer_id: string;
  assigned_at: string;
  status: 'active' | 'paused' | 'cancelled';
  user?: User;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'client' | 'trainer' | 'admin';
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientOnboarding {
  id: string;
  user_id: string;
  trainer_id: string;
  age?: number;
  gender?: string;
  height_cm?: number;
  weight_kg?: number;
  goal_weight_kg?: number;
  primary_goal?: string;
  activity_level?: string;
  dietary_restrictions?: string[];
  food_allergies?: string[];
  workout_preferences?: {
    preferred_duration?: number;
    preferred_time?: string;
    [key: string]: any;
  };
  equipment_access?: string[];
  completed_at?: string;
  created_at: string;
}

export interface ClientWithDetails extends Client {
  user: User;
  onboarding?: ClientOnboarding;
}
