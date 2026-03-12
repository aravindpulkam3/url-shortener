# 🔗 URL Shortener API

A backend REST API that shortens long URLs, tracks clicks, and auto-expires links after 30 days.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- nanoid
- express-rate-limit

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:5000
```

### 3. Start the server

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Shorten a URL
```
POST /api/shorten
```
Body:
```json
{
  "originalUrl": "https://www.example.com/some/very/long/url"
}
```
Response:
```json
{
  "originalUrl": "https://www.example.com/some/very/long/url",
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123",
  "clicks": 0,
  "expiresAt": "2025-04-12T00:00:00.000Z"
}
```

### Redirect to original URL
```
GET /:code
```
Visiting `http://localhost:5000/abc123` in browser redirects to the original URL and increments click count.

### Get URL stats
```
GET /api/stats/:code
```
Response:
```json
{
  "originalUrl": "https://www.example.com/...",
  "shortCode": "abc123",
  "clicks": 12,
  "createdAt": "2025-03-12T00:00:00.000Z",
  "expiresAt": "2025-04-12T00:00:00.000Z"
}
```

### Delete a short URL
```
DELETE /api/:code
```

---

## ✨ Features

- Generates unique 6 character short codes using nanoid
- Tracks how many times each short URL was visited
- Auto deletes URLs after 30 days using MongoDB TTL index
- Rate limiting — max 10 requests per minute per IP
