const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory user database
let users = [
  {
    username: '兰曦',
    passwordHash: hashPassword('Th0r0dins0n!_OWNER'),
    createdAt: new Date().toISOString()
  }
];

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/auth', (req, res) => {
  const { action, username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Username and password are required.'
    });
  }

  const trimmedUsername = username.trim();

  if (action === 'signup') {
    const userExists = users.some(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'That username is already taken.'
      });
    }

    const passwordHash = hashPassword(password);
    users.push({
      username: trimmedUsername,
      passwordHash,
      createdAt: new Date().toISOString()
    });

    return res.json({
      status: 'success',
      message: 'Account created successfully.'
    });
  }

  if (action === 'login') {
    const passwordHash = hashPassword(password);
    const user = users.find(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase() &&
           u.passwordHash === passwordHash
    );

    if (user) {
      return res.json({
        status: 'success',
        message: 'Login successful.'
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password.'
      });
    }
  }

  return res.status(400).json({
    status: 'error',
    message: 'Invalid action.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
