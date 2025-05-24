'use client';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/context/UserContext';
import { format } from 'date-fns';
import { fetchAssignedProjectsByName } from '@/services/projectService';

export default function ProjectProgress() {
  const { currentUser } = useCurrentUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!currentUser?.fullName) return;
      const projects = await fetchAssignedProjectsByName(currentUser.fullName);
      const formatted = projects.map((p) => ({
        name: p.name,
        progress: p.progress,
        deadline: format(new Date(p.deadline), 'yyyy-MM-dd'),
      }));
      setData(formatted);
    };
    if (currentUser?.role === 'client') load();
  }, [currentUser]);

  if (!data.length) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-xl font-semibold mb-4'>Project Progress Over Time</h2>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='deadline' />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='progress' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
