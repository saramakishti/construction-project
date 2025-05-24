import DashboardCharts from './Charts';
import Metrics from './Metrics';

export default function AdminOverview() {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4 text-gray-800 text-center'>
        Your Overview
      </h2>
      <Metrics />
      <DashboardCharts />
    </div>
  );
}
