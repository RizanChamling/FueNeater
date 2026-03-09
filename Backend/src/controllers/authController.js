const userService = require('../services/userService');

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    userService.registerUser({ username, email, password }, (err, user) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Username or Email already exists' });
        }
        return res.status(500).json({ message: 'Error registering user', error: err.message });
      }
      res.status(201).json({ message: 'User registered successfully', user });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    userService.loginUser(email, password, (err, data) => {
      if (err) {
        const status = err.message === 'User not found' || err.message === 'Invalid password' ? 401 : 500;
        return res.status(status).json({ message: err.message });
      }
      res.status(200).json({ message: 'Login successful', ...data });
    });
  }
};

module.exports = authController;
