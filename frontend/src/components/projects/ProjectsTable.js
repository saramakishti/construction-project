'use client';
import { deleteProject } from '@/services/projectService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatDate } from '@/utils/date';
import { Trash2, View } from 'lucide-react';
import { useCurrentUser } from '@/context/UserContext';

export default function ProjectsTable({ projects, setProjects }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const openProjectDetails = (id) => {
    router.push(`/dashboard/projects/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete project.');
    }
  };

  return (
    <>
      <div className='overflow-x-auto bg-white rounded-lg'>
        <table className='min-w-full table-auto text-left'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Client</th>
              <th className='px-4 py-2'>Type</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Start Date</th>
              <th className='px-4 py-2'>Deadline</th>
              <th className='px-4 py-2'>Budget</th>
              <th className='px-4 py-2'>Workers</th>
              <th className='px-4 py-2'>Location</th>
              <th className='px-4 py-2'>Progress</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              console.log('workers', project);
              return (
                <tr key={project.id}>
                  <td className='px-4 py-2'>{project.name}</td>
                  <td className='px-4 py-2'>{project.client}</td>
                  <td className='px-4 py-2'>{project.type}</td>
                  <td className='px-4 py-2'>{project.status}</td>
                  <td className='px-4 py-2'>{formatDate(project.startDate)}</td>
                  <td className='px-4 py-2'>{formatDate(project.deadline)}</td>
                  <td className='px-4 py-2'>{project.budget}</td>
                  <td className='px-4 py-2'>{project.workers?.length}</td>
                  <td className='px-4 py-2'>{project.location}</td>
                  <td className='px-4 py-2'>{project.progress}%</td>
                  <td className='px-4 py-2'>
                    <div className='flex justify-around'>
                      <button
                        onClick={() => openProjectDetails(project.id)}
                        className='text-yellow-600 hover:underline cursor-pointer'
                        title='View'
                      >
                        <View />
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(project.id)}
                          className='text-red-600 hover:underline cursor-pointer'
                          title='Delete'
                        >
                          <Trash2 />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h3 className='text-xl font-semibold mb-4'>Confirm Deletion</h3>
            <p className='mb-6'>
              Are you sure you want to delete this project?
            </p>
            <div className='flex justify-end space-x-4'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
