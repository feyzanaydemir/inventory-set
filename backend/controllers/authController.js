const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.createToken = async (req, res) => {
  try {
    const user = await User.signIn(req.body.email, req.body.password);

    // Create a new token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 12 * 60 * 60,
    });

    res
      .cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
      .status(200)
      .json({
        firstname: user.firstname,
        lastname: user.lastname,
      });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.deleteToken = (req, res) => {
  res
    .cookie('jwt', '', { maxAge: 1 })
    .status(200)
    .json('Successfully signed out.');
};