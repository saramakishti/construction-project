const API_BASE = 'http://localhost:5000/metrics';

export const fetchDashboardMetrics = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
};
