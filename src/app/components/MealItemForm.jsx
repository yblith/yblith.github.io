'use client';

import { useState } from 'react';

export default function MealItemForm({ mealType, onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !calories || !protein) {
      alert('Please fill in all fields.');
      return;
    }

    const newItem = {
      name: itemName.trim(),
      calories: parseInt(calories, 10),
      protein: parseInt(protein, 10),
    };

    onAddItem(mealType, newItem);
    setItemName('');
    setCalories('');
    setProtein('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2 capitalize">Add to {mealType}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <div>
          <label htmlFor={`${mealType}-itemName`} className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            id={`${mealType}-itemName`}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label htmlFor={`${mealType}-calories`} className="block text-sm font-medium text-gray-700">
            Calories
          </label>
          <input
            type="number"
            id={`${mealType}-calories`}
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label htmlFor={`${mealType}-protein`} className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            id={`${mealType}-protein`}
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Item
      </button>
    </form>
  );
}
