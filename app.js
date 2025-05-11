const dailyCaloriesInput = document.getElementById('daily-calories');
const dailyProteinInput = document.getElementById('daily-protein');
const log = document.getElementById('entries');
const clearBtn = document.getElementById('clear-btn');

const breakfastCaloriesInput = document.getElementById('breakfast-calories');
const breakfastProteinInput = document.getElementById('breakfast-protein');

const lunchCaloriesInput = document.getElementById('lunch-calories');
const lunchProteinInput = document.getElementById('lunch-protein');

const dinnerCaloriesInput = document.getElementById('dinner-calories');
const dinnerProteinInput = document.getElementById('dinner-protein');

const snacksCaloriesInput = document.getElementById('snacks-calories');
const snacksProteinInput = document.getElementById('snacks-protein');

const snackNameInput = document.getElementById('snack-name');
const snackCaloriesInput = document.getElementById('snack-calories');
const snackProteinInput = document.getElementById('snack-protein');
const addSnackButton = document.getElementById('add-snack');
const standardSnackList = document.getElementById('standard-snack-list');

let dailyGoal = JSON.parse(localStorage.getItem('dailyGoal') || '{}');
let meals = JSON.parse(localStorage.getItem('meals') || '{}');
let standardSnacks = JSON.parse(localStorage.getItem('standardSnacks') || '[]');

function saveDailyGoal() {
  const dailyGoal = {
    calories: dailyCaloriesInput.value,
    protein: dailyProteinInput.value
  };
  localStorage.setItem('dailyGoal', JSON.stringify(dailyGoal));
}

function saveMeals() {
  const meals = {
    breakfast: { calories: breakfastCaloriesInput.value, protein: breakfastProteinInput.value },
    lunch: { calories: lunchCaloriesInput.value, protein: lunchProteinInput.value },
    dinner: { calories: dinnerCaloriesInput.value, protein: dinnerProteinInput.value },
    snacks: { calories: snacksCaloriesInput.value, protein: snacksProteinInput.value }
  };
  localStorage.setItem('meals', JSON.stringify(meals));
}

function renderLog() {
  log.innerHTML = '';

  const totalCalories = meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories + meals.snacks.calories;
  const totalProtein = meals.breakfast.protein + meals.lunch.protein + meals.dinner.protein + meals.snacks.protein;

  log.innerHTML = `
    <div><strong>Daily Goal:</strong> ${dailyGoal.calories} kcal / ${dailyGoal.protein}g protein</div>
    <div><strong>Total Intake:</strong> ${totalCalories} kcal / ${totalProtein}g protein</div>
    <div><strong>Meals:</strong></div>
    <div>Breakfast: ${meals.breakfast.calories} kcal / ${meals.breakfast.protein}g protein</div>
    <div>Lunch: ${meals.lunch.calories} kcal / ${meals.lunch.protein}g protein</div>
    <div>Dinner: ${meals.dinner.calories} kcal / ${meals.dinner.protein}g protein</div>
    <div>Snacks: ${meals.snacks.calories} kcal / ${meals.snacks.protein}g protein</div>
  `;
}

addSnackButton.addEventListener('click', () => {
  const snack = {
    name: snackNameInput.value,
    calories: snackCaloriesInput.value,
    protein: snackProteinInput.value
  };
  standardSnacks.push(snack);
  localStorage.setItem('standardSnacks', JSON.stringify(standardSnacks));
  renderStandardSnacks();
});

function renderStandardSnacks() {
  standardSnackList.innerHTML = '';
  standardSnacks.forEach(snack => {
    const snackItem = document.createElement('div');
    snackItem.textContent = `${snack.name}: ${snack.calories} kcal / ${snack.protein}g protein`;
    standardSnackList.appendChild(snackItem);
  });
}

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all entries?')) {
    localStorage.clear();
    location.reload();
  }
});

// Load data from localStorage
if (dailyGoal.calories) {
  dailyCaloriesInput.value = dailyGoal.calories;
  dailyProteinInput.value = dailyGoal.protein;
}

if (meals.breakfast) {
  breakfastCaloriesInput.value = meals.breakfast.calories;
  breakfastProteinInput.value = meals.breakfast.protein;
}

if (meals.lunch) {
  lunchCaloriesInput.value = meals.lunch.calories;
  lunchProteinInput.value = meals.lunch.protein;
}

if (meals.dinner) {
  dinnerCaloriesInput.value = meals.dinner.calories;
  dinnerProteinInput.value = meals.dinner.protein;
}

if (meals.snacks) {
  snacksCaloriesInput.value = meals.snacks.calories;
  snacksProteinInput.value = meals.snacks.protein;
}

renderLog();
renderStandardSnacks();
