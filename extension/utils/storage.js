// Storage utilities for Linear Link Formatter Extension

// Storage keys
const STORAGE_KEYS = {
  LAST_INPUT: "lastInput",
  FORMAT_HISTORY: "formatHistory",
  SETTINGS: "settings",
};

// Default settings
const DEFAULT_SETTINGS = {
  theme: "dark",
  autoDetect: true,
  maxHistoryItems: 10,
};

// Save data to Chrome storage
export async function saveToStorage(key, data) {
  try {
    await chrome.storage.local.set({ [key]: data });
    return true;
  } catch (error) {
    console.error("Failed to save to storage:", error);
    return false;
  }
}

// Get data from Chrome storage
export async function getFromStorage(key, defaultValue = null) {
  try {
    const result = await chrome.storage.local.get([key]);
    return result[key] !== undefined ? result[key] : defaultValue;
  } catch (error) {
    console.error("Failed to get from storage:", error);
    return defaultValue;
  }
}

// Save last input text
export async function saveLastInput(input) {
  return await saveToStorage(STORAGE_KEYS.LAST_INPUT, input);
}

// Get last input text
export async function getLastInput() {
  return await getFromStorage(STORAGE_KEYS.LAST_INPUT, "");
}

// Add item to format history
export async function addToHistory(input, output) {
  try {
    const history = await getFromStorage(STORAGE_KEYS.FORMAT_HISTORY, []);
    const newItem = {
      id: Date.now(),
      input,
      output,
      timestamp: new Date().toISOString(),
    };

    // Add to beginning of array
    history.unshift(newItem);

    // Keep only the last N items
    const maxItems = (await getSettings()).maxHistoryItems;
    const trimmedHistory = history.slice(0, maxItems);

    return await saveToStorage(STORAGE_KEYS.FORMAT_HISTORY, trimmedHistory);
  } catch (error) {
    console.error("Failed to add to history:", error);
    return false;
  }
}

// Get format history
export async function getHistory() {
  return await getFromStorage(STORAGE_KEYS.FORMAT_HISTORY, []);
}

// Clear format history
export async function clearHistory() {
  return await saveToStorage(STORAGE_KEYS.FORMAT_HISTORY, []);
}

// Get settings
export async function getSettings() {
  const settings = await getFromStorage(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );
  return { ...DEFAULT_SETTINGS, ...settings };
}

// Save settings
export async function saveSettings(settings) {
  const currentSettings = await getSettings();
  const updatedSettings = { ...currentSettings, ...settings };
  return await saveToStorage(STORAGE_KEYS.SETTINGS, updatedSettings);
}

// Clear all storage
export async function clearAllStorage() {
  try {
    await chrome.storage.local.clear();
    return true;
  } catch (error) {
    console.error("Failed to clear storage:", error);
    return false;
  }
}

// Get storage usage info
export async function getStorageInfo() {
  try {
    const usage = await chrome.storage.local.getBytesInUse();
    const quota = chrome.storage.local.QUOTA_BYTES;
    return {
      usage,
      quota,
      percentage: (usage / quota) * 100,
    };
  } catch (error) {
    console.error("Failed to get storage info:", error);
    return null;
  }
}
