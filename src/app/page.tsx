'use client';

import { useState, useEffect } from 'react';
import { DailyLog, MealItem, MealType, DAILY_GOALS } from '@/types';
import { getDailyLog, saveDailyLog } from '@/lib/storage';
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
  const [currentDate, setCurrentDate] = useState<string>(getTodayDateString());
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);

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

  const calculateTotals = (log: DailyLog): { calories: number; protein: number } => {
    let totalCalories = 0;
    let totalProtein = 0;
    (Object.keys(log.meals) as MealType[]).forEach(mealType => {
      log.meals[mealType].forEach(item => {
        totalCalories += item.calories;
        totalProtein += item.protein;
      });
    });
    return { calories: totalCalories, protein: totalProtein };
  };

  const handleAddItem = (mealType: MealType, item: Omit<MealItem, 'id'>) => {
    if (!dailyLog) return;

    const newItem: MealItem = {
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

  const handleRemoveItem = (mealType: MealType, itemId: string) => {
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
  
  // Function to handle date change (e.g., for viewing previous/next day)
  const handleDateChange = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate.toISOString().split('T')[0]);
  };


  return (
    <main className="container mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Calorie & Protein Tracker</h1>
        <div className="mt-2 flex justify-center items-center space-x-2">
            <button 
                onClick={() => handleDateChange(-1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
                Previous Day
            </button>
            <p className="text-xl text-gray-600">{currentDate}</p>
            <button 
                onClick={() => handleDateChange(1)}
                disabled={currentDate === getTodayDateString()} // Disable if it's today
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                Next Day
            </button>
        </div>
         <Link href="/trends" className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline">
            View Trends
        </Link>
      </header>

      <DailyProgress currentLog={dailyLog} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <MealItemForm mealType="breakfast" onAddItem={handleAddItem} />
          <MealLog mealType="breakfast" items={dailyLog?.meals.breakfast || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div>
          <MealItemForm mealType="lunch" onAddItem={handleAddItem} />
          <MealLog mealType="lunch" items={dailyLog?.meals.lunch || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div>
          <MealItemForm mealType="dinner" onAddItem={handleAddItem} />
          <MealLog mealType="dinner" items={dailyLog?.meals.dinner || []} onRemoveItem={handleRemoveItem} />
        </div>
        <div>
          <MealItemForm mealType="snacks" onAddItem={handleAddItem} />
          <MealLog mealType="snacks" items={dailyLog?.meals.snacks || []} onRemoveItem={handleRemoveItem} />
        </div>
      </div>
    </main>
  );
}
