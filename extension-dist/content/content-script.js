chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    const selectedText = window.getSelection().toString();
    sendResponse({ selectedText });
  } else if (request.action === "getClipboardData") {
    getClipboardData().then((clipboardText) => {
      sendResponse({ clipboardText });
    }).catch((err) => {
      console.error("Failed to read clipboard:", err);
      sendResponse({ clipboardText: null });
    });
  } else if (request.action === "copyToClipboard") {
    copyToClipboard(request.text).then(() => {
      sendResponse({ success: true });
    }).catch(() => {
      sendResponse({ success: false });
    });
  } else if (request.action === "detectLinearLinks") {
    const links = detectLinearLinks();
    sendResponse({ links });
  }
});
async function getClipboardData() {
  try {
    const clipboardText = await navigator.clipboard.readText();
    return clipboardText;
  } catch (err) {
    console.error("Failed to read clipboard:", err);
    throw err;
  }
}
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}
function detectLinearLinks() {
  const links = [];
  const linkElements = document.querySelectorAll('a[href*="linear.app"]');
  linkElements.forEach((link) => {
    const href = link.href;
    const text = link.textContent.trim();
    if (href.includes("/issue/") && text) {
      links.push({
        url: href,
        text,
        element: link
      });
    }
  });
  return links;
}
function highlightLinearLinks() {
  const links = detectLinearLinks();
  if (links.length > 0) {
    links.forEach((link) => {
      if (!link.element.classList.contains("linear-formatter-detected")) {
        link.element.classList.add("linear-formatter-detected");
        link.element.style.borderBottom = "2px solid #8b5cf6";
        link.element.style.position = "relative";
        const tooltip = document.createElement("div");
        tooltip.className = "linear-formatter-tooltip";
        tooltip.textContent = "Click to format";
        tooltip.style.cssText = `
          position: absolute;
          background: #1f2937;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        `;
        link.element.appendChild(tooltip);
        link.element.addEventListener("mouseenter", () => {
          tooltip.style.opacity = "1";
        });
        link.element.addEventListener("mouseleave", () => {
          tooltip.style.opacity = "0";
        });
        link.element.addEventListener("click", (e) => {
          e.preventDefault();
          formatSingleLink(link);
        });
      }
    });
  }
}
function formatSingleLink(link) {
  const formattedText = `- [${link.text}](${link.url})`;
  chrome.runtime.sendMessage(
    {
      action: "formatText",
      text: formattedText
    },
    (response) => {
      if (response && response.formattedText) {
        copyToClipboard(response.formattedText).then(() => {
          showNotification("Link formatted and copied to clipboard!");
        });
      }
    }
  );
}
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
  `;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
    style.remove();
  }, 3e3);
}
function init() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightLinearLinks);
  } else {
    highlightLinearLinks();
  }
  const observer = new MutationObserver((mutations) => {
    let shouldRescan = false;
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        shouldRescan = true;
      }
    });
    if (shouldRescan) {
      setTimeout(highlightLinearLinks, 500);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
init();
