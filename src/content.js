console.log("Content script loaded");

const getPageContent = () => {
  const bodyText = document.body.innerText;
  console.log("Original bodyText:", bodyText);

  const ignoreList = ["Privacy - Terms", "protected by reCAPTCHA", "-"];

  const filteredText = bodyText
    .split("\n")
    .filter((line) => !ignoreList.includes(line.trim()))
    .join("\n");

  console.log("Filtered bodyText:", filteredText);

  return filteredText.substring(0, 5000);
};

const filteredContent = getPageContent();

if (filteredContent.length > 0) {
  chrome.runtime.sendMessage(
    { action: "summarize-page", content: filteredContent },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error:", chrome.runtime.lastError.message);
      } else {
        console.log("Received summary in content.js:", response.summary);
      }
    }
  );
} else {
  console.log("Filtered content is empty. No message sent to the API.");
}
