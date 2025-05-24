const express = require('express');
const { db } = require('../firebase');
const { calculateProgress } = require('../utils/calculateProgress');

const router = express.Router();

// Create project
router.post('/', async (req, res) => {
  const {
    name,
    client,
    type,
    startDate,
    deadline,
    budget,
    workers,
    location,
    status,
  } = req.body;

  try {
    const progress = calculateProgress({ startDate, deadline, status });

    const newProject = {
      name,
      client,
      type,
      startDate,
      deadline,
      budget: Number(budget),
      workers: workers.map((w) => w.trim()),
      location,
      status,
      progress,
    };

    const docRef = await db.collection('projects').add(newProject);
    res.status(201).json({ id: docRef.id, ...newProject });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    client,
    type,
    startDate,
    deadline,
    budget,
    workers,
    location,
    status,
  } = req.body;

  try {
    const progress = calculateProgress({ startDate, deadline, status });

    const updatedProject = {
      name,
      client,
      type,
      startDate,
      deadline,
      budget: Number(budget),
      workers: workers.map((w) => w.trim()),
      location,
      status,
      progress,
    };

    await db.collection('projects').doc(id).update(updatedProject);
    res.status(200).json({ id, ...updatedProject });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('projects').doc(id).delete();
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await db.collection('projects').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Comments

// GET /projects/:id/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const snapshot = await db
      .collection('projects')
      .doc(req.params.id)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .get();

    const comments = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /projects/:id/comments
router.post('/:id/comments', async (req, res) => {
  const { user, role, text } = req.body;

  try {
    const newComment = {
      user,
      role,
      text,
      createdAt: new Date().toISOString(),
    };

    await db
      .collection('projects')
      .doc(req.params.id)
      .collection('comments')
      .add(newComment);

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error posting comment:', err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// Get projects assigned to a specific user (client or worker)
router.get('/assigned-by-name/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(
        (project) =>
          project.client === name ||
          (Array.isArray(project.workers) && project.workers.includes(name))
      );

    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching assigned projects:', err);
    res.status(500).json({ error: 'Failed to fetch assigned projects' });
  }
});

module.exports = router;
