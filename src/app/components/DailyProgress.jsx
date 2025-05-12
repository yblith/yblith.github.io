'use client';

export default function DailyProgress({ currentLog, dailyGoals }) {
  const consumedCalories = currentLog?.dailyTotals.calories || 0;
  const consumedProtein = currentLog?.dailyTotals.protein || 0;

  const remainingCalories = (dailyGoals?.calories || 0) - consumedCalories;
  const remainingProtein = (dailyGoals?.protein || 0) - consumedProtein;

  const calorieProgress = dailyGoals?.calories ? (consumedCalories / dailyGoals.calories) * 100 : 0;
  const proteinProgress = dailyGoals?.protein ? (consumedProtein / dailyGoals.protein) * 100 : 0;

  return (
    <div className="p-4 border rounded-lg mb-6 bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-slate-100">Daily Progress</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700 dark:text-blue-400">Calories</span>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
              {consumedCalories} / {dailyGoals?.calories || 0} kcal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(calorieProgress, 100)}%` }}
            ></div>
          </div>
          {remainingCalories > 0 ? (
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">{remainingCalories} kcal remaining</p>
          ) : (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Goal reached! {Math.abs(remainingCalories)} kcal over.
            </p>
          )}
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-green-700 dark:text-green-400">Protein</span>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              {consumedProtein} / {dailyGoals?.protein || 0} g
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-700">
            <div
              className="bg-green-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(proteinProgress, 100)}%` }}
            ></div>
          </div>
          {remainingProtein > 0 ? (
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">{remainingProtein}g protein remaining</p>
          ) : (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Goal reached! {Math.abs(remainingProtein)}g protein over.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
