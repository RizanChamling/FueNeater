const db = require('../config/db');

const User = {
  createUser: (userData, callback) => {
    const { username, email, password_hash, role = 'user' } = userData;
    const query = 'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password_hash, role], (err, results) => {
      callback(err, results);
    });
  },

  findUserByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  findUserById: (id, callback) => {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
