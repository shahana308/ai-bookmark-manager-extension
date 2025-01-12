document.addEventListener("DOMContentLoaded", () => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    const categorizedBookmark = getCategorizedBookmark(bookmarkTreeNodes);
    console.log(categorizedBookmark);
  });
});

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
