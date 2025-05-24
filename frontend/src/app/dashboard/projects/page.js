'use client';
import { useEffect, useState } from 'react';
import {
  fetchProjects,
  createProject,
  fetchAssignedProjectsByName,
} from '@/services/projectService';
import ProjectsForm from '@/components/projects/ProjectsForm';
import ProjectsTable from '@/components/projects/ProjectsTable';
import { useCurrentUser } from '@/context/UserContext';
import { fetchWorkers } from '@/services/userService';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    projectName: '',
    client: '',
    projectType: '',
    startDate: '',
    deadline: '',
    budget: '',
    workers: [],
    location: '',
  });
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const loadData = async () => {
      try {
        let data;
        if (isAdmin) {
          data = await fetchProjects();
        } else {
          data = await fetchAssignedProjectsByName(currentUser?.fullName);
        }
        const workerData = await fetchWorkers();
        setWorkers(workerData);
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    loadData();
  }, [currentUser]);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const created = await createProject({
        ...newProject,
        budget: Number(newProject.budget),
        workers: newProject.workers,
      });

      setProjects((prev) => [...prev, created]);
      setShowModal(false);
      setNewProject({
        name: '',
        client: '',
        type: '',
        startDate: '',
        deadline: '',
        budget: '',
        workers: [],
        location: '',
        status: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create project.');
    }
  };

  if (loadingProjects) {
    return <div className='p-6 text-gray-500'>Loading projects...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>All Projects</h1>

      {isAdmin && (
        <button
          className='mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
          onClick={() => setShowModal(true)}
        >
          Create New Project
        </button>
      )}

      <ProjectsTable projects={projects} setProjects={setProjects} />

      {showModal && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
            <h2 className='text-2xl font-semibold mb-6'>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <ProjectsForm
                workers={workers}
                projectData={newProject}
                setProjectData={setNewProject}
              />
              <div className='flex justify-end space-x-4 mt-6'>
                <button
                  type='button'
                  onClick={() => setShowModal(false)}
                  className='px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
