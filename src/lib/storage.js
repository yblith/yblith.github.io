const STORAGE_KEY_PREFIX = 'calorieTracker_';

function getStorageKey(date) {
  return `${STORAGE_KEY_PREFIX}${date}`;
}

export function saveDailyLog(log) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(getStorageKey(log.date), JSON.stringify(log));
    } catch (error) {
      console.error('Error saving to local storage:', error);
      // Optionally, notify the user or implement a more robust error handling strategy
    }
  }
}

export function getDailyLog(date) {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(getStorageKey(date));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from local storage:', error);
      return null;
    }
  }
  return null;
}

export function getAllDailyLogs() {
  const logs = [];
  if (typeof window !== 'undefined') {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
          const data = localStorage.getItem(key);
          if (data) {
            logs.push(JSON.parse(data));
          }
        }
      }
      // Sort logs by date, most recent first
      return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error reading all logs from local storage:', error);
      return [];
    }
  }
  return [];
}
