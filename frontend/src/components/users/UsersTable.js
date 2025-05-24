import { useState } from 'react';
import { USER_ROLES } from '@/config';
import { Trash2, SquarePen } from 'lucide-react';
import { updateUser, deleteUser } from '@/services/userService';

export default function UsersTable({ users, onUserUpdated, onUserDeleted }) {
  const [editingUser, setEditingUser] = useState(null);
  const [edited, setEdited] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEdited(user);
    setShowModal(true);
  };

  const saveEdit = async () => {
    try {
      const updatedUser = await updateUser(editingUser, {
        fullName: edited.fullName,
        email: edited.email,
        role: edited.role,
      });
      onUserUpdated(updatedUser);
      setShowModal(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Error updating user.');
    }
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUserId);
      onUserDeleted(selectedUserId);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    } finally {
      setShowConfirm(false);
      setSelectedUserId(null);
    }
  };

  return (
    <>
      <div className='overflow-x-auto bg-white rounded-lg'>
        <table className='min-w-full table-auto text-left'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              console.log('user', user);
              return (
                <tr key={user.id}>
                  <td className='px-4 py-2'>{user.fullName}</td>
                  <td className='px-4 py-2'>{user.email}</td>
                  <td className='px-4 py-2 capitalize'>{user.role}</td>
                  <td className='px-4 py-2'>
                    <div className='flex space-x-3'>
                      <button
                        onClick={() => startEdit(user)}
                        className='text-blue-600 hover:underline cursor-pointer'
                        title='Edit'
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => confirmDelete(user.id)}
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

      {/* Edit Modal */}
      {showModal && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Edit User</h2>
            <div className='space-y-4'>
              <div>
                <label className='block font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  value={edited.fullName}
                  onChange={(e) =>
                    setEdited({ ...edited, fullName: e.target.value })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div>
                <label className='block font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  value={edited.email}
                  onChange={(e) =>
                    setEdited({ ...edited, email: e.target.value })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div>
                <label className='block font-medium text-gray-700 mb-1'>
                  Role
                </label>
                <select
                  value={edited.role}
                  onChange={(e) =>
                    setEdited({ ...edited, role: e.target.value })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer capitalize'
                >
                  {USER_ROLES.map((role) => (
                    <option className='capitalize' key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
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

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className='flex justify-end space-x-4 mt-6'>
              <button
                onClick={() => setShowConfirm(false)}
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
