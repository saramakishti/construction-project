const API_BASE = 'http://localhost:5000/tasks';

export async function fetchTasks() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteTask(id) {
  return fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}

export async function fetchWorkerDashboardData(workerId) {
  const res = await fetch(`${API_BASE}/worker-dashboard/${workerId}`);
  if (!res.ok) throw new Error('Failed to fetch worker dashboard data');
  return res.json();
}

export const getTaskCountsPerProject = async () => {
  const res = await fetch(`${API_BASE}/stats/tasks-per-project`);
  if (!res.ok) throw new Error('Failed to fetch task counts per project');
  return res.json();
};
