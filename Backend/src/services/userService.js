const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const userService = {
  registerUser: (userData, callback) => {
    const { username, email, password } = userData;

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);

      User.createUser({ username, email, password_hash: hash }, (err, results) => {
        if (err) return callback(err);
        callback(null, { id: results.insertId, username, email });
      });
    });
  },

  loginUser: (email, password, callback) => {
    User.findUserByEmail(email, (err, user) => {
      if (err) return callback(err);
      if (!user) return callback(new Error('User not found'));

      // Check password
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) return callback(new Error('Invalid password'));

        // Generate JWT
        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: '1h' }
        );

        callback(null, { 
          token, 
          user: { id: user.id, username: user.username, email: user.email, role: user.role } 
        });
      });
    });
  }
};

module.exports = userService;
