console.log("Content script loaded");

const getPageContent = () => {
  const bodyText = document.body.innerText;
  console.log("bodyText", bodyText);
  return bodyText.substring(0, 2000);
};

chrome.runtime.sendMessage(
  { action: "summarize-page", content: getPageContent() },
  (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
    } else {
      console.log("Received summary in content.js:", response.summary);
    }
  }
);
