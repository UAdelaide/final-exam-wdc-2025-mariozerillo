const express = require('express');
const router = express.Router();
const db = require('../models/db');
const session = require('express-session');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  res.json(req.session.user);
});

// POST login (dummy version)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE username = ? AND password_hash = ?
    `, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // store user info in session
    req.session.user = {
      id: rows[0].user_id
    };
    res.json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/logout', async(req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/index.html');
  } catch (error) {
    res.status(500).json({ error: 'Failed to logout' });
  }

});

router.get('/fetchDogs', async(req, res) => {
  try {
    // select all dogs for user id in session
    const fetchDogsSql = 'SELECT dog_id, name FROM Dogs WHERE owner_id = ?';
    const owner_id = req.session.user.id;

    const [rows] = await db.execute(fetchDogsSql, [owner_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch dogs' });
  }

});

// return all dogs, repurposed from part 1.
router.get('/dogs', async(req, res, next) => {
    try {
        const fetchDogsSql = 'SELECT dog_id, name, size, owner_id FROM Dogs';

        const [result] = await db.execute(fetchDogsSql);

        res.json(result);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// fetch enough images for all dogs
router.get('/fetchImages', async(req, res) => {
  try {
    // return count of all dogs
    const countDogsSql = 'SELECT COUNT(*) AS total FROM Dogs';
    const [count] = await db.execute(countDogsSql);

    // query api for that amount of random images
    const response = await fetch('https://dog.ceo/api/breeds/image/random/' + count[0].total);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;