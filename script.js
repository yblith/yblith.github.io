document.addEventListener('DOMContentLoaded', () => {
    const calorieForm = document.getElementById('calorie-form');
    const itemList = document.getElementById('item-list');
    const totalCaloriesDisplay = document.getElementById('total-calories');

    let items = [];
    let totalCalories = 0;

    calorieForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const foodItemInput = document.getElementById('food-item');
        const caloriesInput = document.getElementById('calories');

        const foodItem = foodItemInput.value;
        const calories = parseInt(caloriesInput.value);

        if (foodItem && !isNaN(calories) && calories > 0) {
            addItem(foodItem, calories);
            foodItemInput.value = '';
            caloriesInput.value = '';
        } else {
            alert('Please enter a valid food item and calorie amount.');
        }
    });

    function addItem(name, calories) {
        const item = { name, calories, id: Date.now() };
        items.push(item);
        renderItems();
        updateTotalCalories();
    }

    function renderItems() {
        itemList.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}: ${item.calories} kcal</span>
                <button class="delete-btn" data-id="${item.id}">Delete</button>
            `;
            itemList.appendChild(li);
        });
        addDeleteEventListeners();
    }

    function addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                deleteItem(itemId);
            });
        });
    }

    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        renderItems();
        updateTotalCalories();
    }

    function updateTotalCalories() {
        totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
        totalCaloriesDisplay.textContent = totalCalories;
    }

    // Initial render in case there's any data loaded from elsewhere in the future
    renderItems();
    updateTotalCalories();
});
