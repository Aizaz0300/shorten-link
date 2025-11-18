const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const generateShortId = require('../utils/generateShortId');

// POST /api/shorten
router.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const shortId = generateShortId();
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;

    const newUrl = new Url({
      shortId,
      originalUrl: url,
      shortUrl,
    });

    await newUrl.save();
    res.json({ short_url: shortUrl });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/analytics/:shortId
router.get('/analytics/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      clicks: url.clicks,
      referrers: url.analytics.map(a => a.referrer).filter(Boolean),
      dates: url.analytics.map(a => a.date),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;