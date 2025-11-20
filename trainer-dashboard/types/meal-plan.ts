export interface MealPlan {
  id: string;
  trainer_id: string;
  name: string;
  description?: string;
  target_calories: number;
  target_protein?: number;
  target_carbs?: number;
  target_fat?: number;
  duration_days: number;
  is_template: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealPlanDay {
  id: string;
  meal_plan_id: string;
  day_number: number;
  meals: Meal[];
  created_at: string;
}

export interface Meal {
  name: string;
  time?: string;
  foods: FoodItem[];
  notes?: string;
}

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealPlanAssignment {
  id: string;
  meal_plan_id: string;
  client_user_id: string;
  trainer_id: string;
  start_date: string;
  end_date?: string;
  status: 'active' | 'completed' | 'cancelled';
  assigned_at: string;
}
