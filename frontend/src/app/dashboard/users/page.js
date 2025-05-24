'use client';
import { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '@/services/userService';
import UsersTable from '@/components/users/UsersTable';
import UsersForm from '@/components/users/UsersForm';
import { useCurrentUser } from '@/context/UserContext';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'worker',
    password: '',
    createdAt: new Date().toISOString().split('T')[0],
  });
  const { currentUser } = useCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    load();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const addedUser = await createUser(newUser);
      setUsers((prev) => [...prev, addedUser]);
      setShowModal(false);
      setNewUser({
        fullName: '',
        email: '',
        role: 'worker',
        password: '',
        createdAt: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('This email is already in use.');
      } else {
        console.error('Error creating user:', err);
        alert('Error: ' + err.message);
      }
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleUserDelete = (deletedUserId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedUserId));
  };

  if (!isAdmin) {
    return <div className='p-6 text-red-500'>Access Denied!</div>;
  }

  if (loadingUsers) {
    return <div className='p-6 text-gray-500'>Loading users...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>All Users</h1>

      <button
        onClick={() => setShowModal(true)}
        className='mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
      >
        Add New User
      </button>

      <UsersTable
        users={users}
        onUserUpdated={handleUserUpdate}
        onUserDeleted={handleUserDelete}
      />

      {showModal && (
        <div
          className='fixed inset-0 flex items-center justify-center z-50'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
            <h2 className='text-2xl font-semibold mb-6'>Create New Project</h2>
            <form autoComplete='off' onSubmit={handleAddUser}>
              <UsersForm userData={newUser} setUserData={setNewUser} />
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
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
