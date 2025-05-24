const express = require('express');
const { db } = require('../firebase');

const router = express.Router();

// Create task
router.post('/', async (req, res) => {
  const {
    projectId,
    projectName,
    assignedTo,
    assignedToId,
    description,
    status,
    dueDate,
  } = req.body;
  const task = {
    projectId,
    projectName,
    assignedTo,
    assignedToId,
    description,
    status: status || 'pending',
    dueDate,
    createdAt: new Date().toISOString(),
  };
  const docRef = await db.collection('tasks').add(task);
  res.status(201).json({ id: docRef.id, ...task });
});

// Get tasks
router.get('/', async (req, res) => {
  const snapshot = await db.collection('tasks').get();
  const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(tasks);
});

// Update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  await db.collection('tasks').doc(id).update(updates);
  res.status(200).json({ id, ...updates });
});

// Delete task
router.delete('/:id', async (req, res) => {
  await db.collection('tasks').doc(id).delete();
  res.status(204).send();
});

// GET tasks assigned to a specific worker by user ID
router.get('/assigned/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const snapshot = await db
      .collection('tasks')
      .where('assignedToId', '==', userId)
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks for worker:', err);
    res.status(500).json({ error: 'Failed to get tasks for this worker' });
  }
});

router.get('/stats/tasks-per-project', async (req, res) => {
  try {
    const snapshot = await db.collection('tasks').get();
    const projectCounts = {};

    snapshot.forEach((doc) => {
      const { projectId, projectName } = doc.data();
      if (projectId) {
        const key = `${projectId}__${projectName || 'Unnamed Project'}`;
        projectCounts[key] = (projectCounts[key] || 0) + 1;
      }
    });

    // Convert to array for frontend charting
    const result = Object.entries(projectCounts).map(([key, count]) => {
      const [projectId, projectName] = key.split('__');
      return { projectId, projectName, taskCount: count };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('Error getting task counts per project:', err);
    res.status(500).json({ error: 'Failed to get task stats' });
  }
});

// GET /tasks/worker-dashboard/:workerId
router.get('/worker-dashboard/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const snapshot = await db
      .collection('tasks')
      .where('assignedToId', '==', workerId)
      .get();

    const workload = {};
    const statusCounts = {};

    snapshot.forEach((doc) => {
      const task = doc.data();

      const projectName = task.projectName || 'Unnamed Project';
      workload[projectName] = (workload[projectName] || 0) + 1;

      const status = task.status || 'Unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const workloadArray = Object.entries(workload).map(
      ([projectName, taskCount]) => ({
        projectName,
        taskCount,
      })
    );

    const statusArray = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));

    res.status(200).json({
      workloadByProject: workloadArray,
      taskStatusDistribution: statusArray,
    });
  } catch (err) {
    console.error('Error loading worker dashboard:', err);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

module.exports = router;
