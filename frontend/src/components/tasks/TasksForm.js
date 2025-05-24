'use client';

import { TASK_STATUS } from '@/config';

export default function TasksForm({
  taskData,
  setTaskData,
  projects = [],
  users = [],
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const selected = projects.find((p) => p.id === e.target.value);
    setTaskData((prev) => ({
      ...prev,
      projectId: selected?.id || '',
      projectName: selected?.name || '',
    }));
  };

  const handleUserChange = (e) => {
    const selected = users.find((u) => u.id === e.target.value);
    setTaskData((prev) => ({
      ...prev,
      assignedToId: selected?.id || '',
      assignedTo: selected?.fullName || '',
    }));
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='block font-medium text-gray-700 mb-1'>Project</label>
        <select
          name='projectId'
          value={taskData.projectId}
          onChange={handleProjectChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        >
          <option value=''>Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>
          Assign To
        </label>
        <select
          name='assignedToId'
          value={taskData.assignedToId}
          onChange={handleUserChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        >
          <option value=''>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>
          Task Description
        </label>
        <textarea
          name='description'
          value={taskData.description}
          onChange={handleChange}
          rows={3}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        />
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>Status</label>
        <select
          name='status'
          value={taskData.status}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        >
          <option value=''>Select a status</option>
          {TASK_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>Due Date</label>
        <input
          type='date'
          name='dueDate'
          value={taskData.dueDate}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        />
      </div>
    </div>
  );
}
