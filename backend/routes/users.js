const express = require('express');
const { db } = require('../firebase');

const router = express.Router();

// Create new user profile
router.post('/', async (req, res) => {
  const { email, fullName, role, createdAt } = req.body;

  try {
    const newUser = { email, fullName, role, createdAt };
    const docRef = await db.collection('users').add(newUser);
    res.status(201).json({ id: docRef.id, ...newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, fullName, role } = req.body;

  try {
    await db.collection('users').doc(id).update({ email, fullName, role });
    res.status(200).json({ id, email, fullName, role });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('users').doc(id).delete();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

//Get worker role users
router.get('/workers', async (req, res) => {
  try {
    const snapshot = await db
      .collection('users')
      .where('role', '==', 'worker')
      .get();
    const workers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers' });
  }
});

module.exports = router;
