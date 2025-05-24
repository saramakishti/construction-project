'use client';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/context/UserContext';
import { fetchAssignedProjectsByName } from '@/services/projectService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C71585'];

export default function BudgetAllocation() {
  const { currentUser } = useCurrentUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const budgets = await fetchAssignedProjectsByName(currentUser.fullName);
      setData(budgets);
    };
    if (currentUser?.role === 'client') load();
  }, [currentUser]);

  if (!data.length) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-xl font-semibold mb-4'>
        Budget Allocation by Project
      </h2>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='budget'
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={100}
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
