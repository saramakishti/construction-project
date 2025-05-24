'use client';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import { fetchAssignedProjectsByName } from '@/services/projectService';
import { useCurrentUser } from '@/context/UserContext';

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0'];

export default function ProjectStatus() {
  const { currentUser } = useCurrentUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const projects = await fetchAssignedProjectsByName(
          currentUser.fullName
        );
        const statusMap = {};

        projects.forEach((p) => {
          statusMap[p.status] = (statusMap[p.status] || 0) + 1;
        });

        const formatted = Object.entries(statusMap).map(([status, count]) => ({
          name: status,
          value: count,
        }));

        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    if (currentUser?.role === 'client') {
      load();
    }
  }, [currentUser]);

  if (data.length === 0) return null;

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-xl font-semibold mb-4'>Project Status Breakdown</h2>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            dataKey='value'
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
