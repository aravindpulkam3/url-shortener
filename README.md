# 🔗 URL Shortener

A full-stack URL shortening web app. Paste a long URL, get a short one instantly. Tracks how many times each link was clicked and auto-expires links after 30 days.

## 🖥️ Live Demo
> Coming soon


## 📸 Screenshots




## ✨ Features

- Shorten any long URL instantly
- Copy short URL with one click
- Tracks click count in real time — updates every 5 seconds
- Auto deletes URLs after 30 days using MongoDB TTL index
- Rate limiting — max 10 requests per minute per IP
- Recent URLs history saved in the browser
- Delete any short URL you created
- Clean dark themed UI

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Packages**
- nanoid — generates unique short codes
- express-rate-limit — prevents API abuse

---

## 📁 Project Structure

```
url-shortener/
├── config/
│   └── db.js            # MongoDB connection
├── controllers/
│   └── urlController.js # Shorten, redirect, stats, delete logic
├── middleware/
│   └── rateLimiter.js   # Rate limiting
├── models/
│   └── Url.js           # MongoDB schema
├── routes/
│   └── urlRoutes.js     # API routes
├── public/
│   ├── index.html       # Frontend page
│   ├── index.css        # Styles
│   └── index.js         # Frontend JavaScript
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally or MongoDB Atlas account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOURUSERNAME/url-shortener.git
cd url-shortener
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:5000
```

**4. Start the server**
```bash
npm run dev
```

**5. Open the app**

Visit `http://localhost:5000` in your browser.

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/shorten` | Shorten a long URL |
| GET | `/:code` | Redirect to original URL |
| GET | `/api/stats/:code` | Get click stats for a short URL |
| DELETE | `/api/:code` | Delete a short URL |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).