console.log("Service Worker: background.js is loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Service Worker received message:", message);
  if (message === "get-user-data") {
    const user = { username: "demo-user" };
    console.log("Sending user data:", user);
    sendResponse(user);
  }
  return true;
});
