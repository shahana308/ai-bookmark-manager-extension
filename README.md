# AI-Powered Bookmark Manager Extension

An intelligent browser extension that categorizes and organizes your bookmarks automatically using AI.

## Summary

The AI-Powered Bookmark Manager Extension leverages the power of **AI** to seamlessly manage your bookmarks. By analyzing page titles and URLs, it assigns relevant categories to your bookmarks, organizes them into folders dynamically, and provides you with an effortless way to keep your bookmarks tidy. With zero-shot classification powered by Hugging Face, it supports a wide range of topics and ensures your bookmarks are always relevant and accessible.

## Features

- **AI-Based Categorization**: Automatically classifies bookmarks into meaningful categories like Travel, Development, Entertainment, and more.
- **Generating Summaries**: Creates concise summaries of bookmarked pages for quick reference.
- **Zero-Shot Classification**: Utilizes Hugging Face models for flexible topic categorization.
- **Dynamic Folder Creation**: Creates folders dynamically based on the content of the bookmarked page.

## Usage

1. **Use the Extension**:
   - Click on the **AI-Powered Bookmark Manager Extension** icon in your browser's toolbar.

2. **Automatic Bookmarking and Summarization**:
   - The extension will:
     - Analyze the title and URL of the current page.
     - Classify it into an appropriate category using AI.
     - Generate a concise summary of the page content using AI.
     - Save the bookmark and organize it into an existing folder or create a new folder if necessary.

3. **View Your Bookmarks**:
   - Navigate to your browser's bookmark manager to see the organized bookmarks along with generated summaries.

## Dependencies

The following dependencies are required for the backend:

- **FastAPI**: A modern web framework for building APIs with Python.
- **Uvicorn**: An ASGI server for running the FastAPI application.
- **Transformers**: Hugging Face library for natural language processing tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ai-bookmark-manager-extension.git
   cd ai-bookmark-manager-extension
2. Set Environment Variables:
   Create a .env file in the root directory and add the required environment variables. For example: env
   ```bash
   HF_API_KEY=<Your HuggingFace API Key>
4. Run the server:
   ```bash
   uvicorn ai_backend:app --host 0.0.0.0 --port 8000
5. Load the Extension in Your Browser:
   - Navigate to your browser's extensions management page (e.g., chrome://extensions/ for Chrome).
   - Enable Developer mode.
   - Click Load unpacked and select the extension folder from the repository.
   - Start Using the Extension:
      Click on the AI-Powered Bookmark Manager Extension icon in your browser's toolbar to classify and summarize pages.


