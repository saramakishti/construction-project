import axios from 'axios';

const API_BASE = 'http://localhost:5000/users';

export const fetchUsers = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_BASE, userData);
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE}/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE}/${id}`);
};

export async function fetchWorkers() {
  const res = await fetch(`${API_BASE}/workers`);
  if (!res.ok) throw new Error('Failed to fetch workers');
  return res.json();
}
