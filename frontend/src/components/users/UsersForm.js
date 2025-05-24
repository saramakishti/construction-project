import { USER_ROLES } from '@/config';

export default function UserForm({ userData, setUserData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div>
        <label className='block font-medium text-gray-700 mb-1'>
          Full Name
        </label>
        <input
          autoComplete='off'
          type='text'
          name='fullName'
          value={userData.fullName}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        />
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>Email</label>
        <input
          autoComplete='off'
          type='email'
          name='email'
          value={userData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        />
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>Password</label>
        <input
          autoComplete='off'
          type='password'
          name='password'
          value={userData.password}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg'
          required
        />
      </div>

      <div>
        <label className='block font-medium text-gray-700 mb-1'>Role</label>
        <select
          name='role'
          value={userData.role}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg capitalize cursor-pointer'
          required
        >
          {USER_ROLES.map((role) => (
            <option key={role} value={role} className='capitalize'>
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
