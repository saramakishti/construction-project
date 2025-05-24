'use client';

import BudgetAllocation from './BudgetAllocation';
import ProjectProgress from './ProjectProgress';
import ProjectStatus from './ProjectStatus';

export default function ClientOverview() {
  return (
    <div className='space-y-8'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>
        Your Projects Overview
      </h2>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <ProjectProgress />
        <BudgetAllocation />
      </div>

      <div>
        <ProjectStatus />
      </div>
    </div>
  );
}
