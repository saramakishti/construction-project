import { format } from 'date-fns';

export function formatDate(input) {
  if (!input) return '';
  const date = new Date(input);
  return isNaN(date) ? 'Invalid date' : format(date, 'dd MMM yyyy');
}
