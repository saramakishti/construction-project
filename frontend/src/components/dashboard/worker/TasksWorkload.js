import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function TasksWorkload({ data }) {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-lg font-semibold mb-4'>Workload by Project</h2>
      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={data}>
          <XAxis dataKey='projectName' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='taskCount' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
