// Messaging utilities for Linear Link Formatter Extension

// Message types
export const MESSAGE_TYPES = {
  FORMAT_TEXT: "formatText",
  SAVE_INPUT: "saveInput",
  GET_HISTORY: "getHistory",
  GET_SELECTED_TEXT: "getSelectedText",
  COPY_TO_CLIPBOARD: "copyToClipboard",
  DETECT_LINEAR_LINKS: "detectLinearLinks",
  OPEN_POPUP: "openPopup",
  SHOW_NOTIFICATION: "showNotification",
};

// Send message to background script
export async function sendToBackground(type, data = {}) {
  try {
    const response = await chrome.runtime.sendMessage({
      action: type,
      ...data,
    });
    return response;
  } catch (error) {
    console.error("Failed to send message to background:", error);
    return null;
  }
}

// Send message to content script
export async function sendToContentScript(tabId, type, data = {}) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, {
      action: type,
      ...data,
    });
    return response;
  } catch (error) {
    console.error("Failed to send message to content script:", error);
    return null;
  }
}

// Send message to popup
export async function sendToPopup(type, data = {}) {
  try {
    const response = await chrome.runtime.sendMessage({
      action: type,
      ...data,
    });
    return response;
  } catch (error) {
    console.error("Failed to send message to popup:", error);
    return null;
  }
}

// Format text using background script
export async function formatText(text) {
  const response = await sendToBackground(MESSAGE_TYPES.FORMAT_TEXT, { text });
  return response?.formattedText || "";
}

// Save input to storage
export async function saveInput(input) {
  const response = await sendToBackground(MESSAGE_TYPES.SAVE_INPUT, { input });
  return response?.success || false;
}

// Get format history
export async function getHistory() {
  const response = await sendToBackground(MESSAGE_TYPES.GET_HISTORY);
  return response?.history || [];
}

// Get selected text from active tab
export async function getSelectedText() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      const response = await sendToContentScript(
        tabs[0].id,
        MESSAGE_TYPES.GET_SELECTED_TEXT
      );
      return response?.selectedText || "";
    }
    return "";
  } catch (error) {
    console.error("Failed to get selected text:", error);
    return "";
  }
}

// Copy text to clipboard
export async function copyToClipboard(text) {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      const response = await sendToContentScript(
        tabs[0].id,
        MESSAGE_TYPES.COPY_TO_CLIPBOARD,
        { text }
      );
      return response?.success || false;
    }
    return false;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

// Detect Linear links on current page
export async function detectLinearLinks() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      const response = await sendToContentScript(
        tabs[0].id,
        MESSAGE_TYPES.DETECT_LINEAR_LINKS
      );
      return response?.links || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to detect Linear links:", error);
    return [];
  }
}

// Open popup programmatically
export async function openPopup() {
  try {
    await chrome.action.openPopup();
    return true;
  } catch (error) {
    console.error("Failed to open popup:", error);
    return false;
  }
}

// Show notification
export async function showNotification(title, message, type = "basic") {
  try {
    await chrome.notifications.create({
      type,
      iconUrl: "assets/icons/icon-48.png",
      title,
      message,
    });
    return true;
  } catch (error) {
    console.error("Failed to show notification:", error);
    return false;
  }
}

// Listen for messages
export function onMessage(callback) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const result = callback(request, sender);
    if (result !== undefined) {
      sendResponse(result);
    }
    return true; // Keep message channel open for async responses
  });
}

// Create message handler
export function createMessageHandler(handlers) {
  return onMessage((request, sender) => {
    const handler = handlers[request.action];
    if (handler) {
      return handler(request, sender);
    }
    return null;
  });
}
