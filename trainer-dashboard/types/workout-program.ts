export interface WorkoutProgram {
  id: string;
  trainer_id: string;
  name: string;
  description?: string;
  duration_weeks: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  equipment_needed?: string[];
  is_template: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutDay {
  id: string;
  workout_program_id: string;
  week_number: number;
  day_number: number;
  exercises: Exercise[];
  created_at: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  notes?: string;
}

export interface WorkoutProgramAssignment {
  id: string;
  program_id: string;
  client_user_id: string;
  trainer_id: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'cancelled';
  assigned_at: string;
}
