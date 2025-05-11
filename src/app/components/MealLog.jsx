'use client';

export default function MealLog({ mealType, items, onRemoveItem }) {
  if (!items || items.length === 0) {
    return (
      <div className="p-4 border rounded-lg mb-4">
        <h3 className="text-lg font-semibold capitalize">{mealType}</h3>
        <p className="text-sm text-gray-500">No items added yet.</p>
      </div>
    );
  }

  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);

  return (
    <div className="p-4 border rounded-lg mb-4">
      <h3 className="text-lg font-semibold capitalize mb-2">{mealType}</h3>
      <ul className="space-y-2 mb-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <span className="font-medium text-black">{item.name}</span>
              <span className="text-sm text-gray-600 ml-2">
                ({item.calories} kcal, {item.protein}g protein)
              </span>
            </div>
            <button
              onClick={() => onRemoveItem(mealType, item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="text-right font-semibold text-black">
        <p>Total: {totalCalories} kcal, {totalProtein}g protein</p>
      </div>
    </div>
  );
}
