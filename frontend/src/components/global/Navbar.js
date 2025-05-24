'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='bg-gray-900 text-white py-4'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link href='/' className='text-2xl font-bold'>
          Biba X Construction
        </Link>
        <ul className='flex space-x-6'>
          <li>
            <Link
              href='/'
              className={
                pathname === '/' ? 'text-blue-400' : 'hover:text-gray-300'
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/about'
              className={
                pathname === '/about' ? 'text-blue-400' : 'hover:text-gray-300'
              }
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href='/login'
              className='bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700'
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
