const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).send('URL not found');
    }

    // Increment clicks
    url.clicks += 1;

    // Add analytics
    url.analytics.push({
      referrer: req.get('Referrer') || '',
      ipAddress: req.ip,
    });

    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;