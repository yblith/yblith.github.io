const form = document.getElementById('entry-form');
const log = document.getElementById('log');
const clearBtn = document.getElementById('clear-btn');

let entries = JSON.parse(localStorage.getItem('trackerEntries') || '[]');

function saveEntries() {
  localStorage.setItem('trackerEntries', JSON.stringify(entries));
}

function renderEntries() {
  log.innerHTML = '';
  let totalCalories = 0;
  let totalProtein = 0;

  entries.forEach((entry, i) => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.textContent = `${entry.date} – ${entry.calories} kcal, ${entry.protein}g protein`;
    log.appendChild(div);

    totalCalories += entry.calories;
    totalProtein += entry.protein;
  });

  const summary = document.createElement('div');
  summary.innerHTML = `<strong>Total: ${totalCalories} kcal, ${totalProtein}g protein</strong>`;
  log.appendChild(summary);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const calories = +document.getElementById('calories').value;
  const protein = +document.getElementById('protein').value;

  const entry = {
    date: new Date().toLocaleDateString(),
    calories,
    protein
  };

  entries.push(entry);
  saveEntries();
  renderEntries();
  form.reset();
});

clearBtn.addEventListener('click', () => {
  if (confirm('Clear all entries?')) {
    entries = [];
    saveEntries();
    renderEntries();
  }
});

renderEntries();
