import { PROJECT_STATUS, PROJECT_TYPE } from '@/config';

export default function ProjectForm({ projectData, setProjectData, workers }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleWorkerSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setProjectData({ ...projectData, workers: selectedOptions });
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>
          Project Name
        </label>
        <input
          type='text'
          name='name'
          value={projectData.name}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Client</label>
        <input
          type='text'
          name='client'
          value={projectData.client}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>
          Project Type
        </label>
        <select
          name='type'
          value={projectData.type}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer'
          required
        >
          <option value=''>Select Type</option>
          {PROJECT_TYPE.map((type) => (
            <>
              <option value={type} key={type}>
                {type}
              </option>
            </>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>
          Start Date
        </label>
        <input
          type='date'
          name='startDate'
          value={projectData.startDate}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Deadline</label>
        <input
          type='date'
          name='deadline'
          value={projectData.deadline}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Budget</label>
        <input
          type='number'
          name='budget'
          value={projectData.budget}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='flex text-gray-700 font-medium mb-2 justify-between'>
          <span>Workers</span>
          <small className='text-gray-500'>
            Hold Ctrl (or Cmd) to select multiple
          </small>
        </label>
        <select
          multiple
          value={projectData.workers}
          onChange={handleWorkerSelect}
          className='w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32'
        >
          {workers.map((worker) => (
            <option key={worker.id} value={worker.fullName}>
              {worker.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Location</label>
        <input
          type='text'
          name='location'
          value={projectData.location}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-medium mb-2'>Status</label>
        <select
          name='status'
          value={projectData.status}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer'
          required
        >
          <option value=''>Select Status</option>
          {PROJECT_STATUS.map((status) => (
            <>
              <option value={status} key={status}>
                {status}
              </option>
            </>
          ))}
        </select>
      </div>
    </div>
  );
}
