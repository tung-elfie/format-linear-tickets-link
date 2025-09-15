import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// SVG Icon for the copy button
const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875h-8.25V3.375z" />
    <path
      fillRule="evenodd"
      d="M11.03 8.25h-3.9a.75.75 0 00-.75.75v11.25a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-3.9v-.75a2.25 2.25 0 00-2.25-2.25h-.375a2.25 2.25 0 00-2.25 2.25v.75zM12 1.5a5.25 5.25 0 00-5.25 5.25v1.875c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75V6.75A5.25 5.25 0 0012 1.5h-.375z"
      clipRule="evenodd"
    />
  </svg>
);

// SVG Icon for the format button
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

function PopupApp() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [isAutoFormatting, setIsAutoFormatting] = useState(false);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    autoDetect: true,
    maxHistoryItems: 20,
    showNotifications: true,
    autoFormatOnDetect: false,
  });

  const formatText = useCallback((text) => {
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
  }, []);

  const handleFormat = useCallback(() => {
    const formattedResult = formatText(inputText);
    setOutputText(formattedResult);

    // Save input to storage
    chrome.storage.local.set({ lastInput: inputText });
  }, [inputText, formatText]);

  // Load saved input and settings from storage on mount
  useEffect(() => {
    chrome.storage.local.get(
      ["lastInput", "formatHistory", "settings"],
      (result) => {
        console.log("Popup loaded storage data:", result);
        // Always set the input text, even if it's empty
        setInputText(result.lastInput || "");
        if (result.lastInput) {
          console.log("Setting input text from storage:", result.lastInput);
          // Auto-format if there's input text from storage (clipboard data)
          setIsAutoFormatting(true);
          setTimeout(() => {
            console.log("Auto-formatting clipboard data...");
            const formattedResult = formatText(result.lastInput);
            console.log("Formatted result:", formattedResult);
            setOutputText(formattedResult);
            setIsAutoFormatting(false);
          }, 100);
        } else {
          console.log(
            "No lastInput found in storage, starting with empty input"
          );
        }
        if (result.formatHistory) {
          setHistory(result.formatHistory);
        }
        if (result.settings) {
          setSettings({ ...settings, ...result.settings });
        }
      }
    );

    // Listen for storage changes (when context menu saves new data)
    const handleStorageChange = (changes, namespace) => {
      if (namespace === "local" && changes.lastInput) {
        console.log(
          "Storage changed - new lastInput:",
          changes.lastInput.newValue
        );
        setInputText(changes.lastInput.newValue);
        // Auto-format when new data is loaded from storage
        setIsAutoFormatting(true);
        setTimeout(() => {
          console.log("Auto-formatting new storage data...");
          const formattedResult = formatText(changes.lastInput.newValue);
          console.log("Formatted result (storage change):", formattedResult);
          setOutputText(formattedResult);
          setIsAutoFormatting(false);
        }, 100);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Also check storage again after a short delay to catch any missed updates
    const checkStorageAgain = setTimeout(() => {
      chrome.storage.local.get(["lastInput"], (result) => {
        if (result.lastInput && result.lastInput !== inputText) {
          console.log(
            "Delayed storage check - found new input:",
            result.lastInput
          );
          setInputText(result.lastInput);
          // Auto-format delayed storage data
          setIsAutoFormatting(true);
          setTimeout(() => {
            console.log("Auto-formatting delayed storage data...");
            const formattedResult = formatText(result.lastInput);
            console.log("Formatted result (delayed):", formattedResult);
            setOutputText(formattedResult);
            setIsAutoFormatting(false);
          }, 100);
        }
      });
    }, 200);

    // Cleanup timeout and listener on unmount
    return () => {
      clearTimeout(checkStorageAgain);
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        setCopyButtonText("Copied!");
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, [outputText]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4">
      <header className="w-full text-center mb-4">
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Format Linear Link
        </h3>
      </header>

      <main className="w-full flex-grow flex flex-col items-center">
        <div className="w-full flex-grow flex flex-col items-stretch gap-4">
          {/* Input Section */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="input-text"
              className="text-lg font-semibold mb-2 text-gray-300"
            >
              Input
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Right-click anywhere and select 'Linear Ticket Link Formatter' to auto-paste clipboard content, or paste your markdown links here manually..."
              className="flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 min-h-[200px] resize-y text-gray-300"
              aria-label="Input for markdown links"
            />
          </div>

          {/* Format Button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleFormat}
              disabled={isAutoFormatting}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-bold text-lg rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
                isAutoFormatting
                  ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-xl transform hover:scale-105"
              }`}
              aria-label="Format Text"
            >
              <span>
                {isAutoFormatting ? "Auto-formatting..." : "Format Text"}
              </span>
              {!isAutoFormatting && <ArrowRightIcon className="w-6 h-6" />}
              {isAutoFormatting && (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="w-full flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="output-text"
                className="text-lg font-semibold text-gray-300"
              >
                Output
              </label>
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 text-sm"
                aria-label="Copy output text to clipboard"
              >
                <CopyIcon className="w-4 h-4" />
                <span>{copyButtonText}</span>
              </button>
            </div>
            <textarea
              id="output-text"
              readOnly
              value={outputText}
              placeholder="Formatted text will appear here..."
              className="flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 min-h-[200px] resize-y text-gray-300"
              aria-label="Formatted output text"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Initialize the React app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<PopupApp />);
}
