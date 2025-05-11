'use client';

import { useState, useEffect } from 'react';
import { getAllDailyLogs } from '../../lib/storage.js';
import Link from 'next/link';

export default function TrendsPage() {
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logs = getAllDailyLogs();
    setAllLogs(logs);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto p-4">
        <p className="text-center text-gray-600">Loading historical data...</p>
      </main>
    );
  }

  if (!allLogs || allLogs.length === 0) {
    return (
      <main className="container mx-auto p-4">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Historical Trends</h1>
        </header>
        <p className="text-center text-gray-600">No historical data found.</p>
        <div className="text-center mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                Back to Today's Log
            </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Historical Trends</h1>
         <div className="text-center mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                Back to Today's Log
            </Link>
        </div>
      </header>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Date</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Total Calories (kcal)</th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600 uppercase tracking-wider">Total Protein (g)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allLogs.map((log) => (
              <tr key={log.date} className="border-b hover:bg-gray-50">
                <td className="text-left py-3 px-4 text-black">{log.date}</td>
                <td className="text-right py-3 px-4 text-black">{log.dailyTotals.calories}</td>
                <td className="text-right py-3 px-4 text-black">{log.dailyTotals.protein}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
