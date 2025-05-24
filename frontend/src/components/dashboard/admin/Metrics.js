'use client';
import { useEffect, useState } from 'react';
import { fetchDashboardMetrics } from '@/services/dashboardService';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error('Error loading dashboard metrics:', err);
      }
    };

    loadMetrics();
  }, []);

  if (!metrics)
    return <div className='p-6 text-gray-500'>Loading dashboard...</div>;

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold'>Total Projects</h2>
          <p className='text-3xl mt-2'>{metrics.totalProjects}</p>
        </div>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold'>Tasks</h2>
          <p className='mt-2'>Completed: {metrics.tasksCompleted}</p>
          <p>Pending: {metrics.tasksPending}</p>
        </div>
        <div className='bg-white shadow rounded-lg p-4'>
          <h2 className='text-lg font-semibold'>Users by Role</h2>
          <p className='mt-2'>Workers: {metrics.roles.worker}</p>
          <p>Admins: {metrics.roles.admin}</p>
          <p>Clients: {metrics.roles.client}</p>
        </div>
      </div>
    </div>
  );
}
