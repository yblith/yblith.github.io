'use client';

import { useState, useEffect } from 'react';
// import { DAILY_GOALS } from '../types/index.js'; // DAILY_GOALS is not used
import { getDailyLog, saveDailyLog } from '../lib/storage.js';
import MealItemForm from './components/MealItemForm';
import MealLog from './components/MealLog';
import DailyProgress from './components/DailyProgress';
import Link from 'next/link';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState(getTodayDateString());
  const [dailyLog, setDailyLog] = useState(null);

  useEffect(() => {
    const log = getDailyLog(currentDate);
    if (log) {
      setDailyLog(log);
    } else {
      // Initialize a new log for the current date if none exists
      setDailyLog({
        date: currentDate,
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        },
        dailyTotals: { calories: 0, protein: 0 },
      });
    }
  }, [currentDate]);

  useEffect(() => {
    if (dailyLog) {
      saveDailyLog(dailyLog);
    }
  }, [dailyLog]);

  const calculateTotals = (log) => {
    let totalCalories = 0;
    let totalProtein = 0;
    Object.keys(log.meals).forEach(mealType => {
      log.meals[mealType].forEach(item => {
        totalCalories += item.calories;
        totalProtein += item.protein;
      });
    });
    return { calories: totalCalories, protein: totalProtein };
  };

  const handleAddItem = (mealType, item) => {
    if (!dailyLog) return;

    const newItem = {
      ...item,
      id: `${mealType}-${new Date().getTime()}` // Simple unique ID
    };

    const updatedLog = {
      ...dailyLog,
      meals: {
        ...dailyLog.meals,
        [mealType]: [...dailyLog.meals[mealType], newItem],
      },
    };
    updatedLog.dailyTotals = calculateTotals(updatedLog);
    setDailyLog(updatedLog);
  };

  const handleRemoveItem = (mealType, itemId) => {
    if (!dailyLog) return;

    const updatedLog = {
      ...dailyLog,
      meals: {
        ...dailyLog.meals,
        [mealType]: dailyLog.meals[mealType].filter(item => item.id !== itemId),
      },
    };
    updatedLog.dailyTotals = calculateTotals(updatedLog);
    setDailyLog(updatedLog);
  };
  
  const handleDateChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate.toISOString().split('T')[0]);
  };


  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">Calorie & Protein Tracker</h1>
        <div className="mt-4 flex justify-center items-center space-x-3">
            <button 
                onClick={() => handleDateChange(-1)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
                &larr; Previous Day
            </button>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">{currentDate}</p>
            <button 
                onClick={() => handleDateChange(1)}
                disabled={currentDate === getTodayDateString()} // Disable if it's today
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors disabled:opacity-50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:disabled:opacity-60"
            >
                Next Day &rarr;
            </button>
        </div>
         <Link href="/trends" className="mt-6 inline-block text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500 underline text-lg">
            View Trends
        </Link>
      </header>

      <DailyProgress currentLog={dailyLog} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <MealItemForm mealType="breakfast" onAddItem={handleAddItem} />
          <MealLog mealType="breakfast" items={dailyLog?.meals.breakfast || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <MealItemForm mealType="lunch" onAddItem={handleAddItem} />
          <MealLog mealType="lunch" items={dailyLog?.meals.lunch || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <MealItemForm mealType="dinner" onAddItem={handleAddItem} />
          <MealLog mealType="dinner" items={dailyLog?.meals.dinner || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <MealItemForm mealType="snacks" onAddItem={handleAddItem} />
          <MealLog mealType="snacks" items={dailyLog?.meals.snacks || []} onRemoveItem={handleRemoveItem} />
        </div>
      </div>
    </main>
  );
}
