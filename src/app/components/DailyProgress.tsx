'use client';

import { DailyLog, DAILY_GOALS } from '@/types';

interface DailyProgressProps {
  currentLog: DailyLog | null;
}

export default function DailyProgress({ currentLog }: DailyProgressProps) {
  const consumedCalories = currentLog?.dailyTotals.calories || 0;
  const consumedProtein = currentLog?.dailyTotals.protein || 0;

  const remainingCalories = DAILY_GOALS.calories - consumedCalories;
  const remainingProtein = DAILY_GOALS.protein - consumedProtein;

  const calorieProgress = (consumedCalories / DAILY_GOALS.calories) * 100;
  const proteinProgress = (consumedProtein / DAILY_GOALS.protein) * 100;

  return (
    <div className="p-4 border rounded-lg mb-6 bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Daily Progress</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700">Calories</span>
            <span className="text-sm font-medium text-blue-700">
              {consumedCalories} / {DAILY_GOALS.calories} kcal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            ></div>
          </div>
          {remainingCalories > 0 ? (
            <p className="text-xs text-gray-600 mt-1">{remainingCalories} kcal remaining</p>
          ) : (
            <p className="text-xs text-green-600 mt-1">Goal reached! {-remainingCalories} kcal over.</p>
          )}
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-green-700">Protein</span>
            <span className="text-sm font-medium text-green-700">
              {consumedProtein} / {DAILY_GOALS.protein} g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(proteinProgress, 100)}%` }}
            ></div>
          </div>
          {remainingProtein > 0 ? (
            <p className="text-xs text-gray-600 mt-1">{remainingProtein}g protein remaining</p>
          ) : (
            <p className="text-xs text-green-600 mt-1">Goal reached! {-remainingProtein}g protein over.</p>
          )}
        </div>
      </div>
    </div>
  );
}
