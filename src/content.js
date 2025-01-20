console.log("ss");
chrome.runtime.sendMessage("get-user-data", (response) => {
  if (chrome.runtime.lastError) {
    console.error("Error:", chrome.runtime.lastError.message);
  } else {
    console.log("Received user data:", response);
    initializeUI(response);
  }
});
