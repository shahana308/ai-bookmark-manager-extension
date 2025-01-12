document.addEventListener("DOMContentLoaded", () => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    console.log("All browser bookmarks:", bookmarkTreeNodes);
  });
});
