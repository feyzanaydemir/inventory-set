const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.getGuest = (req, res) => {
  res.status(200).json({
    email: process.env.REACT_APP_GUEST_EMAIL,
    password: process.env.REACT_APP_GUEST_PASSWORD,
  });
};

module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    // Create a new token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: 12 * 60 * 60,
    });

    // Set cookie and send relevant information only
    res
      .cookie('jwt', token, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 })
      .status(201)
      .json({
        id: newUser._id,
        username: newUser.firstname + ' ' + newUser.lastname,
      });
  } catch (err) {
    res.json(Object.keys(err.errors));
  }
};
