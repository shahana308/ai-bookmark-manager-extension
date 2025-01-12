document.addEventListener("DOMContentLoaded", () => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    const categorizedBookmark = getCategorizedBookmark(bookmarkTreeNodes);
    console.log(categorizedBookmark);
  });
});

// Get existing bookmark folder
const getCategorizedBookmark = (bookmarkNodes) => {
  const result = [];
  bookmarkNodes[0].children.map((allbookmark) => {
    allbookmark.children.map((bookmark) => {
      if (bookmark.children) {
        result.push(bookmark);
      }
    });
  });

  return result;
};

// when a bookmark icon is clicked, AI should check the content of the url, check if any keyword is there in existing bookmark
// if existing, add to that folder; else create a new foler using a meaningful name.
