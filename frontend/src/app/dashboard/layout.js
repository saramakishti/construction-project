'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { House, Building, UserCog, ListChecks, LogOut } from 'lucide-react';
import Link from 'next/link';
import { UserProvider } from '@/context/UserContext';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <UserProvider>
      <div className='flex min-h-screen'>
        <aside className='bg-gray-900 text-white w-64 p-6 space-y-6'>
          <h2 className='text-xxl font-bold mb-8'>Biba X Dashboard</h2>
          <ul className='space-y-4'>
            <li>
              <Link
                href='/dashboard'
                className='text-gray-300 hover:text-white flex gap-5'
              >
                <House />
                Overview
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/projects'
                className='text-gray-300 hover:text-white flex gap-5'
              >
                <Building />
                Projects
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/tasks'
                className='text-gray-300 hover:text-white flex gap-5'
              >
                <ListChecks />
                Tasks Management
              </Link>
            </li>
            <li>
              <Link
                href='/dashboard/users'
                className='text-gray-300 hover:text-white flex gap-5'
              >
                <UserCog />
                User Management
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className='text-gray-300 hover:text-white flex gap-5 cursor-pointer'
              >
                <LogOut />
                Logout
              </button>
            </li>
          </ul>
        </aside>

        <main className='flex-1 p-10 bg-gray-100'>{children}</main>
      </div>
    </UserProvider>
  );
}
