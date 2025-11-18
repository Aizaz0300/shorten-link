require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', require('./routes/urlRoutes'));

// Analytics page route - Check analytics with optional redirect
app.get('/analytics/:shortId', require('./routes/analyticsRoute'));

// Redirect route
app.get('/:shortId', require('./routes/redirectRoute'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});