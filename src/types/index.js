const DEFAULT_GOALS = {
  calories: 2000,
  protein: 150,
};

const STORAGE_KEY = 'dailyGoals';

export const getDailyGoals = () => {
  if (typeof window !== 'undefined') {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      return JSON.parse(storedGoals);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GOALS));
  }
  return DEFAULT_GOALS;
};

export const saveDailyGoals = (goals) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }
};