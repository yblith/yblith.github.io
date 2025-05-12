'use client';

import { useState, useEffect } from 'react';

export default function GoalSetter({ currentGoals, onGoalsChange }) {
  const [calories, setCalories] = useState(currentGoals.calories);
  const [protein, setProtein] = useState(currentGoals.protein);

  useEffect(() => {
    setCalories(currentGoals.calories);
    setProtein(currentGoals.protein);
  }, [currentGoals]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoals = {
      calories: parseInt(calories, 10) || 0,
      protein: parseInt(protein, 10) || 0,
    };
    onGoalsChange(newGoals);
  };

  return (
    <div className="p-4 border rounded-lg mb-6 bg-white dark:bg-slate-800 dark:border-slate-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-100">Set Your Daily Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="caloriesGoal" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Calories (kcal)
          </label>
          <input
            type="number"
            name="caloriesGoal"
            id="caloriesGoal"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900 dark:text-slate-100"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="proteinGoal" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Protein (g)
          </label>
          <input
            type="number"
            name="proteinGoal"
            id="proteinGoal"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-900 dark:text-slate-100"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800"
        >
          Set Goals
        </button>
      </form>
    </div>
  );
}
