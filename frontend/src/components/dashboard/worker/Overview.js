'use client';

import { useCurrentUser } from '@/context/UserContext';
import TasksDistribution from './TasksDistribution';
import TasksWorkload from './TasksWorkload';
import { useState, useEffect } from 'react';
import { fetchWorkerDashboardData } from '@/services/taskService';

export default function WorkerOverview() {
  const { currentUser } = useCurrentUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    const load = async () => {
      try {
        const result = await fetchWorkerDashboardData(currentUser.id);
        setData(result);
      } catch (err) {
        console.error('Failed to load worker dashboard:', err);
      }
    };
    load();
  }, [currentUser]);

  if (!data) {
    return <div className='text-gray-500 p-6'>Loading dashboard...</div>;
  }

  return (
    <div className='space-y-12'>
      {' '}
      <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>
        Your Tasks Overview
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <TasksWorkload data={data.workloadByProject} />
        <TasksDistribution data={data.taskStatusDistribution} />
      </div>
    </div>
  );
}
