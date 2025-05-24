const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { admin } = require('./firebase');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const metricsRoutes = require('./routes/metrics');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Biba X Backend is Running!');
});

app.get('/test-auth', async (req, res) => {
  try {
    const users = await admin.auth().listUsers(10);
    res.json(users.users.map((user) => user.email));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
});

// Mount project routes
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/metrics', metricsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
