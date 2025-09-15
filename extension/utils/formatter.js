// Core formatting logic for Linear Link Formatter Extension

// Format Linear ticket links
export function formatLinearLinks(text) {
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

// Detect if text contains Linear links
export function containsLinearLinks(text) {
  const linearLinkRegex = /\[.*?\]\(https?:\/\/.*?linear\.app.*?\)/g;
  return linearLinkRegex.test(text);
}

// Extract Linear links from text
export function extractLinearLinks(text) {
  const linearLinkRegex = /\[(.*?)\]\((https?:\/\/.*?linear\.app.*?)\)/g;
  const links = [];
  let match;

  while ((match = linearLinkRegex.exec(text)) !== null) {
    links.push({
      title: match[1],
      url: match[2],
      fullMatch: match[0],
    });
  }

  return links;
}

// Format a single Linear link
export function formatSingleLink(title, url) {
  const cleanTitle = title.replace(/\\(\[|])/g, "$1");
  const formattedTitle = cleanTitle.replace(/:\s/, "-");
  return `- [${formattedTitle}](${url})`;
}

// Categorize a single link
export function categorizeLink(title) {
  const cleanTitle = title.replace(/\\(\[|])/g, "$1").toLowerCase();

  if (cleanTitle.includes("[bug]")) {
    return "bug";
  } else if (cleanTitle.includes("[improvement]")) {
    return "improvement";
  } else {
    return "normal";
  }
}

// Get statistics about formatted links
export function getFormatStats(text) {
  const links = extractLinearLinks(text);
  const stats = {
    total: links.length,
    bugs: 0,
    improvements: 0,
    normal: 0,
  };

  links.forEach((link) => {
    const category = categorizeLink(link.title);
    stats[category]++;
  });

  return stats;
}

// Validate Linear URL
export function isValidLinearUrl(url) {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes("linear.app") &&
      urlObj.pathname.includes("/issue/")
    );
  } catch {
    return false;
  }
}

// Extract ticket ID from Linear URL
export function extractTicketId(url) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const issueIndex = pathParts.indexOf("issue");
    if (issueIndex !== -1 && pathParts[issueIndex + 1]) {
      return pathParts[issueIndex + 1];
    }
    return null;
  } catch {
    return null;
  }
}

// Format with custom categories
export function formatWithCustomCategories(text, categories = {}) {
  const lines = text.split("\n");
  const categorized = {};

  // Initialize categories
  Object.keys(categories).forEach((key) => {
    categorized[key] = [];
  });

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine.startsWith("- [")) {
      return;
    }

    const match = trimmedLine.match(/\[(.*?)]\(.*\)/);
    if (match && match[1]) {
      const rawTitle = match[1];
      const cleanTitle = rawTitle.replace(/\\(\[|])/g, "$1");
      const formattedTitle = cleanTitle.replace(/:\s/, "-");
      const fullLine = `- ${formattedTitle}`;

      // Check against custom categories
      let categorized = false;
      Object.entries(categories).forEach(([category, keywords]) => {
        if (
          keywords.some((keyword) =>
            cleanTitle.toLowerCase().includes(keyword.toLowerCase())
          )
        ) {
          categorized[category].push(fullLine);
          categorized = true;
        }
      });

      // If not categorized, add to default
      if (!categorized) {
        if (!categorized["other"]) {
          categorized["other"] = [];
        }
        categorized["other"].push(fullLine);
      }
    }
  });

  const resultParts = [];
  Object.entries(categorized).forEach(([category, items]) => {
    if (items.length > 0) {
      resultParts.push(`${category}:\n${items.join("\n")}`);
    }
  });

  return resultParts.join("\n\n");
}
