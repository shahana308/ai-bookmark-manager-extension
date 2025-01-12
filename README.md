# AI-Powered Bookmark Manager Extension

An intelligent browser extension that categorizes and organizes your bookmarks automatically using AI.

---

## Features

- **AI-Based Categorization**: Automatically classifies bookmarks into meaningful categories like Travel, Development, Entertainment, and more.
- **Zero-Shot Classification**: Utilizes HuggingFace models for flexible topic categorization.
- **Dynamic Folder Creation**: Creates folders dynamically based on the content of the bookmarked page.


## Usage

1. **Bookmark a page** using the browser's bookmark button.

2. The extension will automatically:
   - **Analyze the title and URL** of the page.
   - **Classify it into an appropriate category** using AI.
   - **Add it to an existing folder** or **create a new folder** if necessary.

3. **View the organized bookmarks** in your browser's bookmark manager.

## Dependencies

The following dependencies are required for the backend:

- **FastAPI**: A modern web framework for building APIs with Python.
- **Uvicorn**: An ASGI server for running the FastAPI application.
- **Transformers**: HuggingFace library for natural language processing tasks.

### Install Dependencies

Run the following command to install all dependencies:

```bash
pip install -r requirements.txt
