export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snacks: MealItem[];
  };
  dailyTotals: {
    calories: number;
    protein: number;
  };
}

// Example daily goals - these could be configurable later
export const DAILY_GOALS = {
  calories: 2000,
  protein: 150,
};