const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check jwt exists and is verified
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.json('Invalid token');
      } else {
        next();
      }
    });
  } else {
    res.json('Token not found');
  }
};

module.exports = { checkAuth };
