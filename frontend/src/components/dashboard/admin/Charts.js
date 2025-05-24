'use client';

import { getTaskCountsPerProject } from '@/services/taskService';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function DashboardCharts() {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const taskRes = await getTaskCountsPerProject();
        setTaskData(taskRes);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='bg-white my-6 p-6 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Tasks per Project</h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={taskData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='projectName' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='taskCount' fill='#10b981' name='Tasks' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
