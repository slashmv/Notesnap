# NoteSnap

NoteSnap is a web application that helps teachers convert their lecture recordings (audio or video) into clear, concise notes using Whisper AI for transcription and Gemini AI for summarization.  
Students can follow teachers and subjects to access these notes in a personalized feed.  

---

## Features

- Teachers can upload lecture audio/video files.
- Automatic transcription using OpenAI Whisper.
- Summarization of lectures into concise notes using Gemini AI.
- Students can follow teachers and subjects to receive relevant notes.
- Admin panel for managing users and content.
- Clean, modern interface with React and TailwindCSS.

---

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Django REST Framework
- **Database:** SQLite (can upgrade to PostgreSQL/MySQL)
- **AI Tools:** Whisper (for transcription), Gemini (for summarization)

---

## Roles

- **Teacher:** Upload lectures, view/manage notes.
- **Student:** View notes, follow teachers and subjects.
- **Admin:** Manage users and content.

---

## Requirements

- Python 3.11+
- Node.js & npm
- Whisper & Gemini API keys
- Django, React, TailwindCSS

Install Python dependencies:
- pip install -r requirements.txt

## How to Run

### Backend

1. Clone the repository:
- git clone https://github.com/your-username/notesnap.git
- cd notesnap

2. Set up a .env file with your Whisper & Gemini API keys.

3. Run migrations and start the server:
- python manage.py migrate
- python manage.py runserver
