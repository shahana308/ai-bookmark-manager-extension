chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message === "get-user-data") {
    const user = { username: "demo-user" };
    sendResponse(user);
  }
  return true;
});
