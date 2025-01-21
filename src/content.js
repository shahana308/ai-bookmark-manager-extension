console.log("Content script loaded");

chrome.runtime.sendMessage("get-user-data", (response) => {
  if (chrome.runtime.lastError) {
    console.error(
      "Error from Service Worker:",
      chrome.runtime.lastError.message
    );
  } else {
    console.log("Received response from Service Worker:", response);
  }
});
