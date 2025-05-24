'use client';

import AdminOverview from '@/components/dashboard/admin/Overview';
import ClientOverview from '@/components/dashboard/client/Overview';
import WorkerOverview from '@/components/dashboard/worker/Overview';
import { useCurrentUser } from '@/context/UserContext';

export default function DashboardOverview() {
  const { currentUser } = useCurrentUser();

  const isAdmin = currentUser?.role === 'admin';
  const isClient = currentUser?.role === 'client';
  const isWorker = currentUser?.role === 'worker';

  console.log('current user', currentUser);
  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>
        Welcome back, {currentUser?.fullName}
      </h1>
      {isAdmin && <AdminOverview />}
      {isClient && <ClientOverview />}
      {isWorker && <WorkerOverview />}
    </div>
  );
}
