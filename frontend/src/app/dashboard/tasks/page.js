'use client';
import { useState, useEffect } from 'react';
import { fetchWorkers } from '@/services/userService';
import { fetchProjects } from '@/services/projectService';
import { createTask, fetchTasks } from '@/services/taskService';
import TasksTable from '@/components/tasks/TasksTable';
import TasksForm from '@/components/tasks/TasksForm';
import { useCurrentUser } from '@/context/UserContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    projectId: '',
    projectName: '',
    assignedTo: '',
    assignedToId: '',
    description: '',
    status: '',
    dueDate: '',
    createdAt: new Date().toISOString().split('T')[0],
  });
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';
  const isClient = currentUser?.role === 'client';

  useEffect(() => {
    const load = async () => {
      try {
        const [taskData, projectData, workerData] = await Promise.all([
          fetchTasks(),
          fetchProjects(),
          fetchWorkers(),
        ]);

        if (isAdmin) {
          setTasks(taskData);
        } else if (currentUser?.role === 'worker') {
          const userTasks = taskData.filter(
            (task) => task.assignedToId === currentUser.id
          );
          setTasks(userTasks);
        }

        setProjects(projectData);
        setWorkers(workerData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingTasks(false);
      }
    };

    if (currentUser) load();
  }, [currentUser]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const addedTask = await createTask(newTask);
      setTasks((prev) => [...prev, addedTask]);
      setShowModal(false);
      setNewTask({
        projectId: '',
        projectName: '',
        assignedTo: '',
        assignedToId: '',
        description: '',
        status: '',
        dueDate: '',
        createdAt: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleTaskDelete = (deletedTaskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== deletedTaskId));
  };

  if (isClient) {
    return <div className='p-6 text-red-500'>Access Denied!</div>;
  }

  if (loadingTasks) {
    return <div className='p-6 text-gray-500'>Loading tasks...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>All Tasks</h1>

      {isAdmin && (
        <button
          onClick={() => setShowModal(true)}
          className='mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
        >
          Add New Task
        </button>
      )}

      <TasksTable
        tasks={tasks}
        onTaskUpdated={handleTaskUpdate}
        onTaskDeleted={handleTaskDelete}
      />

      {showModal && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
            <h2 className='text-2xl font-semibold mb-6'>Create New Task</h2>
            <form autoComplete='off' onSubmit={handleAddTask}>
              <TasksForm
                taskData={newTask}
                setTaskData={setNewTask}
                projects={projects}
                users={workers}
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
