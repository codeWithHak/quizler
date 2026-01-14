# QUIZLER 📚💀

**The AI-powered quiz generator for students who study at 2 AM before exams.**

> It's 2 AM. Exam tomorrow. You haven't opened the book all semester. We've all been there.

Quizler is a web application that transforms your study materials into instant MCQ quizzes using AI. Upload a PDF, paste your notes, and let AI do the heavy lifting so you can at least *pretend* you studied.

---

## 🎯 Who is this for?

- **Procrastinators** who only start studying the night before exams
- **Students** who want to test themselves without making flashcards manually  
- **Anyone** who learns better through practice questions than rereading notes

---

## ✨ Features

### Currently Available
- **PDF to Quiz** — Upload any PDF and get an instant MCQ quiz
- **Text to Quiz** — Paste notes or any text and generate practice questions
- **PDF to Notes** — Extract text and get an AI-powered summary
- **Instant Feedback** — See correct/incorrect answers immediately after submission
- **Score Tracking** — Know exactly how screwed (or prepared) you are

### Tech Stack
- **Frontend:** Next.js 14, React, TailwindCSS
- **Backend:** FastAPI (Python)
- **AI:** OpenAI GPT for question generation
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API Key

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn src.app.main:app --reload
```

### Environment Variables

**Backend (.env)**
```
OPENAI_API_KEY=your_openai_api_key
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🔮 Roadmap — What's Coming Next

### Phase 1: User Accounts & History
- [ ] Google OAuth / Email sign-up
- [ ] Quiz history dashboard
- [ ] Score analytics over time
- [ ] Track weak topics

### Phase 2: Enhanced Quiz Features
- [ ] Choose number of questions (5, 10, 15, 20)
- [ ] Difficulty levels (Easy / Medium / Hard)
- [ ] Timed quiz mode with countdown
- [ ] True/False and Fill-in-blank question types

### Phase 3: Social & Sharing
- [ ] Shareable quiz links
- [ ] Compare scores with friends
- [ ] Community quiz library
- [ ] Leaderboards

### Phase 4: Study Tools
- [ ] Flashcards mode with spaced repetition
- [ ] Export quizzes as PDF
- [ ] Anki deck export
- [ ] Topic-based question filtering

### Phase 5: Monetization
- [ ] Free tier (5 quizzes/day)
- [ ] Pro tier ($4.99/month) with unlimited quizzes
- [ ] Stripe payment integration
- [ ] Priority AI processing for Pro users

---

## 🤝 Contributing

Pull requests welcome! Whether it's fixing bugs, adding features, or improving the UI — all contributions help fellow backbenchers survive exam season.

---

## 📄 License

MIT License — Use it, modify it, just don't blame us if you still fail the exam. 💀

---

## 🙏 Acknowledgments

Built for procrastinators, by procrastinators. Good luck on your exams!

**Made with ☕ and panic at 2 AM**
