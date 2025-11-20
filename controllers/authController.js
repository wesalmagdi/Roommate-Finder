const bcrypt = require('bcrypt');

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword
    };

    res.status(201).json({
      message: 'User signed up successfully!',
      user: newUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
}

module.exports = { signup };
