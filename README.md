# URL Shortener with Analytics

A full-stack URL shortener service with built-in analytics tracking.

## Features

- Shorten long URLs into unique, easy-to-share links
- Track click analytics (clicks, referrers, dates)
- View analytics dashboard for each shortened URL

## Technologies

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: Next.js, React, Axios
- **Database**: MongoDB

## Setup

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up MongoDB (local or MongoDB Atlas)
5. Create `.env` file in backend with `MONGODB_URI`
6. Run backend: `cd backend && npm start`
7. Run frontend: `cd frontend && npm run dev`

## API Endpoints

- `POST /api/shorten` - Shorten a URL
- `GET /:shortId` - Redirect to original URL
- `GET /api/analytics/:shortId` - Get analytics for a URL
- `GET /analytics/:shortId` - Get analytics data and optionally redirect