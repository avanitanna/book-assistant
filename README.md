# Book Reading Assistant

## Overview
Book Reading Assistant is an application that allows you to:
- Fetch books from ebooks (such as from Project Gutenberg!) by providing their URL. You can replace this with any other ebook sources/ kindle per your choice!
- Generate summaries for selected chapters.
- Create flashcards based on chapter summaries for efficient reading/study.

## Features
- **Fetch Book:** Retrieve book content and parse chapters from a given URL (this project focuses on Project Gutenberg as a source).
- **Chapter Summary:** Summarize a selected chapter into a concise overview.
- **Flashcards:** Generate flashcards with questions on the front and answers on the back.

## Project Structure
```
BookAssistant/
├── backend/
│   ├── app/
│   │   ├── routes.py
│   │   └── services/
│   │       ├── book_service.py
│   │       ├── flashcard_service.py
│   │       └── summary_service.py
│   ├── run.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChapterSummary.jsx
│   │   │   ├── FetchBook.jsx
│   │   │   └── Flashcards.jsx
│   │   ├── App.jsx
│   │   └── index.js
├── .env
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js and npm

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the root directory with the required API settings:
   ```env
   OPENROUTER_MODEL=your_model_here
   OPENROUTER_API_KEY=your_api_key_here
   ```
5. Start the backend server:
   ```bash
   python run.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage
1. Open your browser at [http://localhost:3000](http://localhost:3000).
2. Use the "Fetch Book" section to input a Project Gutenberg URL and fetch the book.
3. Select a chapter and generate its summary.
4. Generate flashcards based on the summary for study and revision.