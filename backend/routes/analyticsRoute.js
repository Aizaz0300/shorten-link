const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// GET /analytics/:shortId - Get analytics data and optionally redirect
router.get('/analytics/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const { redirect } = req.query; // redirect=true to redirect to original URL

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // If redirect parameter is true, increment clicks and redirect
    if (redirect === 'true') {
      url.clicks += 1;
      url.analytics.push({
        referrer: req.get('Referrer') || '',
        ipAddress: req.ip,
      });
      await url.save();
      return res.redirect(url.originalUrl);
    }

    // Otherwise, return analytics data as JSON
    const analyticsData = {
      shortId,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      referrers: url.analytics.map(a => a.referrer || 'Direct').filter(r => r),
      dates: url.analytics.map(a => a.date),
    };

    res.json(analyticsData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
