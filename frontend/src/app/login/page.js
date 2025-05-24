'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log('Logged in user:', userData);
        router.push('/dashboard');
      } else {
        setError('No matching user profile found in Firestore.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Login to BibaX</h2>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={handleLogin} autoComplete='off'>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2'>
              Email
            </label>
            <input
              autoComplete='off'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-2'>
              Password
            </label>
            <input
              autoComplete='off'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full mb-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer'
          >
            Login
          </button>
          <Link
            href='/'
            className='text-blue-500 hover:text-gray-500 flex gap-5'
          >
            Back to website
          </Link>
        </form>
      </div>
    </div>
  );
}
