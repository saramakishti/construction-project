const express = require('express');
const { db } = require('../firebase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [projectsSnap, tasksSnap, usersSnap] = await Promise.all([
      db.collection('projects').get(),
      db.collection('tasks').get(),
      db.collection('users').get(),
    ]);

    const tasks = tasksSnap.docs.map((doc) => doc.data());
    const users = usersSnap.docs.map((doc) => doc.data());

    const metrics = {
      totalProjects: projectsSnap.size,
      totalTasks: tasks.length,
      tasksCompleted: tasks.filter((t) => t.status === 'Completed').length,
      tasksPending: tasks.filter((t) => t.status !== 'Completed').length,
      roles: {
        worker: users.filter((u) => u.role === 'worker').length,
        admin: users.filter((u) => u.role === 'admin').length,
        client: users.filter((u) => u.role === 'client').length,
      },
    };

    res.status(200).json(metrics);
  } catch (err) {
    console.error('Failed to fetch metrics:', err);
    res.status(500).json({ error: 'Failed to load metrics' });
  }
});

module.exports = router;
