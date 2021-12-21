const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const User = new mongoose.Schema({
  firstname: { type: String, required: true, minlength: 2, maxlength: 12 },
  lastname: { type: String, required: true, minlength: 2, maxlength: 12 },
  email: { type: String, required: true, unique: true, validate: isEmail },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  },
});

User.index({ email: 1 });

// Hash password before saving user to database
User.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Validate sign in
User.statics.signIn = async function (email, password) {
  // Find the user registered with this email
  const user = await this.findOne({ email }).lean();

  if (user) {
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      return user;
    }

    // If passwords don't match
    throw Error('Incorrect email or password');
  }

  // If no user was found
  throw Error('Incorrect email or password');
};

module.exports = mongoose.model('User', User);
