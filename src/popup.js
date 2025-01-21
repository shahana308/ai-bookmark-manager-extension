document.addEventListener("DOMContentLoaded", () => {
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    const categorizedBookmark = getCategorizedBookmark(bookmarkTreeNodes);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];

      const currentUrl = currentTab.url;
      const currentTitle = currentTab.title;

      classifyBookmark(currentTitle, currentUrl)
        .then((category) => {
          console.log("AI-predicted category:", category);
          addBookmarkToCategory(
            category,
            currentTitle,
            currentUrl,
            categorizedBookmark
          );
        })
        .catch((err) => console.error("AI classification error:", err));
    });
  });

  chrome.runtime.sendMessage({ action: "get-summary" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
      document.getElementById("summary").textContent =
        "Error retrieving summary.";
    } else {
      console.log("Received summary in popup:", response.summary);
      document.getElementById("summary").textContent =
        response.summary || "No summary available.";
    }
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

const classifyBookmark = async (title, url) => {
  console.log(title, url);
  const response = await fetch("http://127.0.0.1:8000/classify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, url }),
  });

  if (!response.ok) {
    throw new Error(`Failed to classify: ${response.statusText}`);
  }

  const data = await response.json();
  return data.category;
};

const addBookmarkToCategory = (category, title, url, existingFolders) => {
  const existingFolder = existingFolders.find(
    (folder) => folder.title === category
  );

  if (existingFolder) {
    chrome.bookmarks.create(
      { parentId: existingFolder.id, title, url },
      (newBookmark) => {
        console.log("Bookmark added to existing folder:", newBookmark);
      }
    );
  } else {
    chrome.bookmarks.create({ title: category }, (newFolder) => {
      chrome.bookmarks.create(
        { parentId: newFolder.id, title, url },
        (newBookmark) => {
          console.log("Bookmark added to new folder:", newBookmark);
        }
      );
    });
  }
};
