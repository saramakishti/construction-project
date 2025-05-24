const API_BASE = 'http://localhost:5000/projects';

export async function fetchProjects() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(projectData) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function updateProject(id, updatedData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete project');
}

export async function fetchProjectById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}

// Comments

export async function fetchComments(projectId) {
  const res = await fetch(`${API_BASE}/${projectId}/comments`);
  if (!res.ok) throw new Error('Failed to load comments');
  return res.json();
}

export async function addComment(projectId, comment) {
  const res = await fetch(`${API_BASE}/${projectId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error('Failed to add comment');
  return res.json();
}

export const fetchAssignedProjectsByName = async (name) => {
  const res = await fetch(
    `${API_BASE}/assigned-by-name/${encodeURIComponent(name)}`
  );
  if (!res.ok) throw new Error('Failed to fetch assigned projects by name');
  return res.json();
};
