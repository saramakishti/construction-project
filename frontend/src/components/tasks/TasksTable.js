'use client';
import { useState } from 'react';
import { formatDate } from '@/utils/date';
import { Trash2, SquarePen } from 'lucide-react';
import { updateTask, deleteTask } from '@/services/taskService';
import { TASK_STATUS } from '@/config';
import { useCurrentUser } from '@/context/UserContext';

export default function TasksTable({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [editingTask, setEditingTask] = useState(null);
  const [edited, setEdited] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEdited(task);
    setShowModal(true);
  };

  const saveEdit = async () => {
    try {
      const updated = await updateTask(editingTask, edited);
      onTaskUpdated(updated);
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Error updating task');
    }
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const confirmDelete = (id) => {
    setSelectedTaskId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(selectedTaskId);
      onTaskDeleted(selectedTaskId);
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task.');
    } finally {
      setShowConfirm(false);
      setSelectedTaskId(null);
    }
  };

  return (
    <>
      <div className='overflow-x-auto bg-white rounded-lg'>
        <table className='min-w-full table-auto text-left'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>Project</th>
              <th className='px-4 py-2'>Assigned To</th>
              <th className='px-4 py-2'>Description</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Due Date</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const canEditOrDelete =
                isAdmin || currentUser.id === task.assignedToId;

              return (
                <tr key={task.id}>
                  <td className='px-4 py-2'>{task.projectName}</td>
                  <td className='px-4 py-2'>{task.assignedTo}</td>
                  <td className='px-4 py-2'>{task.description}</td>
                  <td className='px-4 py-2 capitalize'>{task.status}</td>
                  <td className='px-4 py-2'>{formatDate(task.dueDate)}</td>
                  <td className='px-4 py-2'>
                    <div className='flex space-x-3'>
                      <button
                        onClick={() => startEdit(task)}
                        className='text-blue-600 hover:underline cursor-pointer'
                        title='Edit'
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => confirmDelete(task.id)}
                        className='text-red-600 hover:underline cursor-pointer'
                        title='Delete'
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-lg'>
            <h2 className='text-xl font-semibold mb-4'>Edit Task</h2>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Description'
                value={edited.description}
                onChange={(e) =>
                  setEdited({ ...edited, description: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded'
              />
              <select
                value={edited.status}
                onChange={(e) =>
                  setEdited({ ...edited, status: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded cursor-pointer'
              >
                {TASK_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <input
                type='date'
                value={edited.dueDate}
                onChange={(e) =>
                  setEdited({ ...edited, dueDate: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded'
              />
              <div className='flex justify-end space-x-4 pt-4'>
                <button
                  onClick={cancelEdit}
                  className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className='flex justify-end space-x-4 mt-6'>
              <button
                onClick={() => setShowConfirm(false)}
                className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
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
