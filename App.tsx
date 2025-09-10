import React, { useState, useCallback } from 'react';

// SVG Icon for the copy button
const CopyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || 'w-6 h-6'}
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
    className={className || 'w-6 h-6'}
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const defaultInput = `- [ELF-18995: \\[Bug\\] \\[OBD5\\]: Missing progress status on due date screen](https://linear.app/elfie/issue/ELF-18995/bug-obd5-missing-progress-status-on-due-date-screen)
- [ELF-18948: \\[Bug\\]\\[OBD5\\] Blood sugar settings - Blood sugar goal section should show all 3 values as design](https://linear.app/elfie/issue/ELF-18948/bugobd5-blood-sugar-settings-blood-sugar-goal-section-should-show-all)
- [ELF-18937: \\[Bug\\]\\[OBD5\\] Medications - The name of medications seem near the screen borders](https://linear.app/elfie/issue/ELF-18937/bugobd5-medications-the-name-of-medications-seem-near-the-screen)
- [ELF-18913: \\[Improvement\\] \\[Women Health v2\\] Remove the word "My" on Detail page and Home screen](https://linear.app/elfie/issue/ELF-18913/improvement-women-health-v2-remove-the-word-my-on-detail-page-and-home)
- [ELF-18883: \\[Bug\\]\\[Obd5\\]: The number should not overlap Elfie logo](https://linear.app/elfie/issue/ELF-18883/bugobd5-the-number-should-not-overlap-elfie-logo)
- [ELF-18854: \\[Improvement\\] \\[Women Health v1\\] \\[Cycle history - detail page\\] Add in YYYY](https://linear.app/elfie/issue/ELF-18854/improvement-women-health-v1-cycle-history-detail-page-add-in-yyyy)
- [ELF-18853: \\[Onboarding 5.0\\] Empty state for Home plan](https://linear.app/elfie/issue/ELF-18853/onboarding-50-empty-state-for-home-plan)
- [ELF-18764: \\[Onboarding 5.0\\] Pregnancy flow](https://linear.app/elfie/issue/ELF-18764/onboarding-50-pregnancy-flow)
- [ELF-18109: \\[Improvement\\] \\[Sleep\\] Update intro screen title: Welcome to your sleep program](https://linear.app/elfie/issue/ELF-18109/improvement-sleep-update-intro-screen-title-welcome-to-your-sleep)
- [ELF-17846: \\[Improvement\\] \\[Women Health\\] Remove user guidance](https://linear.app/elfie/issue/ELF-17846/improvement-women-health-remove-user-guidance)
- [ELF-17397: \\[Improvement\\] \\[Women Health\\] \\[Detail page\\] "Abnormally long cycle" and "Abnormally short cycle" for Calendar Card](https://linear.app/elfie/issue/ELF-17397/improvement-women-health-detail-page-abnormally-long-cycle-and)`;


function App() {
  const [inputText, setInputText] = useState(defaultInput);
  const [outputText, setOutputText] = useState('');
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleFormat = useCallback(() => {
    const lines = inputText.split('\n');
    const bugs = [];
    const improvements = [];
    const normal = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine.startsWith('- [')) {
        return; // Skip non-matching or empty lines
      }
      
      const match = trimmedLine.match(/\[(.*?)]\(.*\)/);
      
      if (match && match[1]) {
        const rawTitle = match[1];
        
        // Un-escape brackets like \[ and \] for proper processing and output
        const cleanTitle = rawTitle.replace(/\\(\[|])/g, '$1');

        // Replace the first colon after the ticket ID with a hyphen
        const formattedTitle = cleanTitle.replace(/:\s/, '-');
        const fullLine = `- ${formattedTitle}`;

        if (cleanTitle.toLowerCase().includes('[bug]')) {
          bugs.push(fullLine);
        } else if (cleanTitle.toLowerCase().includes('[improvement]')) {
          improvements.push(fullLine);
        } else {
          normal.push(fullLine);
        }
      }
    });
    
    const resultParts = [];
    if (normal.length > 0) {
      resultParts.push('Normal ticket:\n' + normal.join('\n'));
    }
    if (improvements.length > 0) {
      resultParts.push('Improvement:\n' + improvements.join('\n'));
    }
    if (bugs.length > 0) {
      resultParts.push('Bug:\n' + bugs.join('\n'));
    }
    
    setOutputText(resultParts.join('\n\n'));
  }, [inputText]);

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  }, [outputText]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-7xl text-center mb-4">
        <h3 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          Format Linear Link 
        </h3>
      </header>
      
      <main className="w-full max-w-7xl flex-grow flex flex-col items-center">
        <div className="w-full flex-grow flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
          {/* Input Section */}
          <div className="w-full lg:flex-1 flex flex-col">
            <label htmlFor="input-text" className="text-lg font-semibold mb-2 text-gray-300">
              Input
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your markdown links here..."
              className="flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 min-h-[300px] lg:min-h-[400px] resize-y text-gray-300"
              aria-label="Input for markdown links"
            />
          </div>

          {/* Format Button */}
          <div className="flex-shrink-0 my-4 lg:my-0">
            <button
              onClick={handleFormat}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 lg:p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg rounded-lg lg:rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              aria-label="Format Text"
            >
              <span className="lg:hidden">Format Text</span>
              <ArrowRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Output Section */}
          <div className="w-full lg:flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="output-text" className="text-lg font-semibold text-gray-300">
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
              className="flex-grow bg-gray-800 border-2 border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 min-h-[300px] lg:min-h-[400px] resize-y text-gray-300"
              aria-label="Formatted output text"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
