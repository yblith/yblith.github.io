document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const calorieGoalInput = document.getElementById('calories-goal');
    const proteinGoalInput = document.getElementById('protein-goal');

    const caloriesProgress = document.getElementById('calories-progress');
    const proteinProgress = document.getElementById('protein-progress');
    const caloriesStats = document.getElementById('calories-stats');
    const proteinStats = document.getElementById('protein-stats');
    const caloriesRemainingDisplay = document.getElementById('calories-remaining');
    const proteinRemainingDisplay = document.getElementById('protein-remaining');

    const mealForms = {
        breakfast: document.getElementById('breakfast-form'),
        lunch: document.getElementById('lunch-form'),
        dinner: document.getElementById('dinner-form'),
        snacks: document.getElementById('snacks-form')
    };

    const mealLists = {
        breakfast: document.getElementById('breakfast-list'),
        lunch: document.getElementById('lunch-list'),
        dinner: document.getElementById('dinner-list'),
        snacks: document.getElementById('snacks-list')
    };

    const endDayButton = document.getElementById('end-day-button');
    const dailyHistoryList = document.getElementById('daily-history-list');

    // App State
    let dailyGoals = {
        calories: parseInt(calorieGoalInput.value) || 2000,
        protein: parseInt(proteinGoalInput.value) || 150
    };

    let dailyTotals = {
        calories: 0,
        protein: 0
    };

    // Load meals from localStorage first, then history
    let meals = JSON.parse(localStorage.getItem('calorieTrackerMeals')) || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };
    let history = JSON.parse(localStorage.getItem('calorieTrackerHistory')) || [];

    // --- Goal Management ---
    function updateGoal(type, value) {
        const numericValue = parseInt(value);
        if (isNaN(numericValue) || numericValue < 0) {
            // Reset to current goal if input is invalid
            if (type === 'calories') calorieGoalInput.value = dailyGoals.calories;
            if (type === 'protein') proteinGoalInput.value = dailyGoals.protein;
            return;
        }
        dailyGoals[type] = numericValue;
        localStorage.setItem('calorieTrackerGoals', JSON.stringify(dailyGoals));
        updateProgressDisplays();
    }

    calorieGoalInput.addEventListener('change', (e) => updateGoal('calories', e.target.value));
    proteinGoalInput.addEventListener('change', (e) => updateGoal('protein', e.target.value));

    function loadGoals() {
        const savedGoals = JSON.parse(localStorage.getItem('calorieTrackerGoals'));
        if (savedGoals) {
            dailyGoals = savedGoals;
            calorieGoalInput.value = dailyGoals.calories;
            proteinGoalInput.value = dailyGoals.protein;
        }
    }

    // --- Meal Item Management ---
    function handleMealFormSubmit(event, mealType) {
        event.preventDefault();
        const form = mealForms[mealType];
        const itemNameInput = form.querySelector(`input[id^="${mealType}-item-name"]`);
        const caloriesInput = form.querySelector(`input[id^="${mealType}-calories"]`);
        const proteinInput = form.querySelector(`input[id^="${mealType}-protein"]`);

        const itemName = itemNameInput.value.trim();
        const calories = parseInt(caloriesInput.value);
        const protein = parseInt(proteinInput.value);

        if (itemName && !isNaN(calories) && calories >= 0 && !isNaN(protein) && protein >= 0) {
            addItemToMeal(mealType, itemName, calories, protein);
            itemNameInput.value = '';
            caloriesInput.value = '';
            proteinInput.value = '';
        } else {
            alert('Please enter valid item name, calories, and protein (must be 0 or greater).');
        }
    }

    Object.keys(mealForms).forEach(mealType => {
        if (mealForms[mealType]) {
            mealForms[mealType].addEventListener('submit', (e) => handleMealFormSubmit(e, mealType));
        }
    });

    function addItemToMeal(mealType, name, calories, protein) {
        const item = { id: Date.now(), name, calories, protein };
        meals[mealType].push(item);
        localStorage.setItem('calorieTrackerMeals', JSON.stringify(meals)); // Save meals
        renderMealList(mealType);
        updateDailyTotals();
    }

    function deleteItemFromMeal(mealType, itemId) {
        meals[mealType] = meals[mealType].filter(item => item.id !== itemId);
        localStorage.setItem('calorieTrackerMeals', JSON.stringify(meals)); // Save meals
        renderMealList(mealType);
        updateDailyTotals();
    }

    function renderMealList(mealType) {
        const listElement = mealLists[mealType];
        listElement.innerHTML = ''; // Clear current items

        if (meals[mealType].length === 0) {
            const li = document.createElement('li');
            li.className = 'no-items';
            li.textContent = 'No items added yet.';
            listElement.appendChild(li);
        } else {
            meals[mealType].forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} (C: ${item.calories} kcal, P: ${item.protein}g)</span>
                    <button class="delete-btn" data-id="${item.id}" data-meal="${mealType}">Delete</button>
                `;
                listElement.appendChild(li);
            });
        }
        addDeleteEventListenersToMealList(listElement);
    }

    function addDeleteEventListenersToMealList(listElement) {
        listElement.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const mealType = this.getAttribute('data-meal');
                deleteItemFromMeal(mealType, itemId);
            });
        });
    }
    
    // --- Daily Totals & Progress Bars ---
    function updateDailyTotals() {
        dailyTotals.calories = 0;
        dailyTotals.protein = 0;
        Object.values(meals).forEach(mealArray => {
            mealArray.forEach(item => {
                dailyTotals.calories += item.calories;
                dailyTotals.protein += item.protein;
            });
        });
        updateProgressDisplays();
    }

    function updateProgressDisplays() {
        // Calories
        const calPercent = dailyGoals.calories > 0 ? (dailyTotals.calories / dailyGoals.calories) * 100 : 0;
        caloriesProgress.style.width = `${Math.min(calPercent, 100)}%`; // Cap at 100%
        caloriesStats.textContent = `${dailyTotals.calories} / ${dailyGoals.calories} kcal`;
        const calRemaining = dailyGoals.calories - dailyTotals.calories;
        caloriesRemainingDisplay.textContent = `${calRemaining < 0 ? 0 : calRemaining} kcal remaining`;
        if (calPercent > 100) caloriesProgress.style.backgroundColor = '#dc3545'; // Red if over goal
        else caloriesProgress.style.backgroundColor = '#007bff';


        // Protein
        const proPercent = dailyGoals.protein > 0 ? (dailyTotals.protein / dailyGoals.protein) * 100 : 0;
        proteinProgress.style.width = `${Math.min(proPercent, 100)}%`; // Cap at 100%
        proteinStats.textContent = `${dailyTotals.protein} / ${dailyGoals.protein} g`;
        const proRemaining = dailyGoals.protein - dailyTotals.protein;
        proteinRemainingDisplay.textContent = `${proRemaining < 0 ? 0 : proRemaining}g protein remaining`;
        if (proPercent > 100) proteinProgress.style.backgroundColor = '#dc3545'; // Red if over goal
        else proteinProgress.style.backgroundColor = '#28a745';
    }

    // --- Daily History ---
    function saveDailyProgress() {
        if (dailyTotals.calories === 0 && dailyTotals.protein === 0) {
            alert("No data to save for the day.");
            return;
        }
        const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        history.unshift({ date: today, calories: dailyTotals.calories, protein: dailyTotals.protein, calorieGoal: dailyGoals.calories, proteinGoal: dailyGoals.protein });
        localStorage.setItem('calorieTrackerHistory', JSON.stringify(history));
        renderDailyHistory();
        resetDay();
        alert("Day ended and progress saved!");
    }

    function renderDailyHistory() {
        dailyHistoryList.innerHTML = '';
        if (history.length === 0) {
            const li = document.createElement('li');
            li.className = 'no-history';
            li.textContent = 'No history yet.';
            dailyHistoryList.appendChild(li);
        } else {
            history.forEach(entry => {
                const li = document.createElement('li');
                const calPercentage = entry.calorieGoal > 0 ? (entry.calories / entry.calorieGoal * 100).toFixed(0) : 0;
                const proPercentage = entry.proteinGoal > 0 ? (entry.protein / entry.proteinGoal * 100).toFixed(0) : 0;
                li.textContent = `
                    ${entry.date}: 
                    Calories: ${entry.calories}/${entry.calorieGoal} kcal (${calPercentage}%), 
                    Protein: ${entry.protein}/${entry.proteinGoal}g (${proPercentage}%)
                `;
                dailyHistoryList.appendChild(li);
            });
        }
    }
    
    endDayButton.addEventListener('click', saveDailyProgress);

    // --- Reset Day ---
    function resetDay() {
        meals = { breakfast: [], lunch: [], dinner: [], snacks: [] };
        localStorage.setItem('calorieTrackerMeals', JSON.stringify(meals)); // Clear saved meals
        Object.keys(mealLists).forEach(mealType => renderMealList(mealType));
        updateDailyTotals(); // This will also update progress displays to 0
    }

    // --- Initialization ---
    function init() {
        loadGoals(); // Load goals first
        // Meals are now loaded at their declaration, so just render them
        Object.keys(mealLists).forEach(mealType => {
            if(meals[mealType]) { // Ensure mealType exists in loaded meals
                renderMealList(mealType);
            }
        });
        updateDailyTotals(); // Calculate totals from potentially loaded meals
        renderDailyHistory(); // Load and display any saved history
    }

    init();
});
