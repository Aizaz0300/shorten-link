const { nanoid } = require('nanoid');

const generateShortId = () => {
  return nanoid(6); // Generate a 6-character unique ID
};

module.exports = generateShortId;