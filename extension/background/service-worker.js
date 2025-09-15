// Service Worker for Linear Link Formatter Extension

// Extension installation and startup
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Linear Link Formatter extension installed/updated");

  // Create single context menu item
  chrome.contextMenus.create({
    id: "linear-formatter",
    title: "Linear Ticket Link Formatter",
    contexts: ["selection", "page"],
    documentUrlPatterns: ["<all_urls>"],
  });

  // Set default storage values
  chrome.storage.local.set({
    lastInput: "",
    formatHistory: [],
    settings: {
      theme: "dark",
      autoDetect: true,
      maxHistoryItems: 20,
      showNotifications: true,
      autoFormatOnDetect: false,
    },
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "linear-formatter") {
    console.log("Context menu clicked, selectionText:", info.selectionText);

    // If there's selected text, use it
    if (info.selectionText) {
      console.log("Using selected text:", info.selectionText);
      chrome.storage.local.set({ lastInput: info.selectionText }, () => {
        console.log("Saved selected text to storage:", info.selectionText);
        chrome.action.openPopup();
      });
    } else {
      // No selected text, try to get clipboard data
      console.log("No selected text, trying to get clipboard data...");

      if (
        tab &&
        tab.id &&
        tab.url &&
        !tab.url.startsWith("chrome://") &&
        !tab.url.startsWith("chrome-extension://")
      ) {
        // Use scripting API to read clipboard directly
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            function: () => {
              return navigator.clipboard
                .readText()
                .then((text) => text)
                .catch((err) => null);
            },
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Failed to execute script:",
                chrome.runtime.lastError
              );
              // Fallback to empty string
              chrome.storage.local.set({ lastInput: "" }, () => {
                console.log(
                  "Saved empty text to storage (script execution failed)"
                );
                chrome.action.openPopup();
              });
            } else if (results && results[0] && results[0].result) {
              console.log("Got clipboard data via script:", results[0].result);
              chrome.storage.local.set({ lastInput: results[0].result }, () => {
                console.log(
                  "Saved clipboard text to storage:",
                  results[0].result
                );
                chrome.action.openPopup();
              });
            } else {
              console.log("No clipboard data from script, using empty string");
              chrome.storage.local.set({ lastInput: "" }, () => {
                console.log(
                  "Saved empty text to storage (no clipboard data from script)"
                );
                chrome.action.openPopup();
              });
            }
          }
        );
      } else {
        console.log("Cannot access clipboard on this page, using empty string");
        chrome.storage.local.set({ lastInput: "" }, () => {
          console.log("Saved empty text to storage (cannot access clipboard)");
          chrome.action.openPopup();
        });
      }
    }
  }
});

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-formatter") {
    chrome.action.openPopup();
  } else if (command === "quick-format") {
    // Get active tab and selected text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getSelectedText" },
          (response) => {
            if (response && response.selectedText) {
              formatLinearLinks(response.selectedText, tabs[0].id);
            }
          }
        );
      }
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "formatText") {
    const formattedText = formatText(request.text);
    // Add to history
    addToHistory(request.text, formattedText);
    sendResponse({ formattedText });
  } else if (request.action === "saveInput") {
    chrome.storage.local.set({ lastInput: request.input });
    sendResponse({ success: true });
  } else if (request.action === "getHistory") {
    chrome.storage.local.get(["formatHistory"], (result) => {
      sendResponse({ history: result.formatHistory || [] });
    });
  } else if (request.action === "clearHistory") {
    chrome.storage.local.set({ formatHistory: [] });
    sendResponse({ success: true });
  } else if (request.action === "getSettings") {
    chrome.storage.local.get(["settings"], (result) => {
      sendResponse({ settings: result.settings || {} });
    });
  } else if (request.action === "saveSettings") {
    chrome.storage.local.set({ settings: request.settings });
    sendResponse({ success: true });
  }
});

// Core formatting function
function formatText(text) {
  const lines = text.split("\n");
  const bugs = [];
  const improvements = [];
  const normal = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine.startsWith("- [")) {
      return; // Skip non-matching or empty lines
    }

    const match = trimmedLine.match(/\[(.*?)]\(.*\)/);

    if (match && match[1]) {
      const rawTitle = match[1];

      // Un-escape brackets like \[ and \] for proper processing and output
      const cleanTitle = rawTitle.replace(/\\(\[|])/g, "$1");

      // Replace the first colon after the ticket ID with a hyphen
      const formattedTitle = cleanTitle.replace(/:\s/, "-");
      const fullLine = `- ${formattedTitle}`;

      if (cleanTitle.toLowerCase().includes("[bug]")) {
        bugs.push(fullLine);
      } else if (cleanTitle.toLowerCase().includes("[improvement]")) {
        improvements.push(fullLine);
      } else {
        normal.push(fullLine);
      }
    }
  });

  const resultParts = [];
  if (normal.length > 0) {
    resultParts.push("Normal ticket:\n" + normal.join("\n"));
  }
  if (improvements.length > 0) {
    resultParts.push("Improvement:\n" + improvements.join("\n"));
  }
  if (bugs.length > 0) {
    resultParts.push("Bug:\n" + bugs.join("\n"));
  }

  return resultParts.join("\n\n");
}

// Format Linear links and copy to clipboard
function formatLinearLinks(text, tabId) {
  const formattedText = formatText(text);

  // Copy to clipboard
  chrome.tabs.sendMessage(
    tabId,
    {
      action: "copyToClipboard",
      text: formattedText,
    },
    (response) => {
      if (response && response.success) {
        // Show notification
        chrome.notifications.create({
          type: "basic",
          iconUrl: "assets/icons/icon-48.png",
          title: "Linear Links Formatted",
          message: "Formatted text copied to clipboard!",
        });
      }
    }
  );
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.action.openPopup();
});

// Clean up old notifications
chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.notifications.clear(notificationId);
});

// Add to formatting history
function addToHistory(input, output) {
  chrome.storage.local.get(["formatHistory", "settings"], (result) => {
    const history = result.formatHistory || [];
    const settings = result.settings || {};
    const maxItems = settings.maxHistoryItems || 20;

    const newItem = {
      id: Date.now(),
      input: input,
      output: output,
      timestamp: new Date().toISOString(),
    };

    // Add to beginning of array
    history.unshift(newItem);

    // Keep only the last N items
    const trimmedHistory = history.slice(0, maxItems);

    chrome.storage.local.set({ formatHistory: trimmedHistory });
  });
}
