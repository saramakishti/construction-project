function calculateProgress({ startDate, deadline, status }) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(deadline);

  if (status === 'Not Started') return 0;
  if (status === 'Completed') return 100;

  const total = end - start;
  const elapsed = now - start;
  const percent = Math.round((elapsed / total) * 100);

  return Math.min(100, Math.max(0, percent));
}

module.exports = { calculateProgress };
