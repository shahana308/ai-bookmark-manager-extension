console.log("Service Worker: background.js is loaded");

let cachedSummary = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "summarize-page") {
    console.log("Received page content for summarization");

    fetch("https://ai-bookmark-manager-extension.onrender.com/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message.content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Summary received from API:", data.summary);
        cachedSummary = data.summary;
        sendResponse({ summary: data.summary });
      })
      .catch((error) => {
        console.error("Error calling summarize API:", error);
        sendResponse({ summary: "Error summarizing content" });
      });

    return true;
  }

  if (message.action === "get-summary") {
    sendResponse({ summary: cachedSummary || "No summary available" });
    return true;
  }
});
