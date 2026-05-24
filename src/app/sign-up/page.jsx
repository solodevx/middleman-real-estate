'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-slate-700 mb-2'>
          Create Admin Account
        </h1>
        <p className='text-slate-400 text-sm mb-6'>
          Restricted. Only authorised team members.
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium text-slate-600'>
              Full name
            </label>
            <input
              type='text'
              id='name'
              placeholder='John Doe'
              className='border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium text-slate-600'>
              Email address
            </label>
            <input
              type='email'
              id='email'
              placeholder='admin@example.com'
              className='border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-medium text-slate-600'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='••••••••'
              className='border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className='text-red-500 text-sm bg-red-50 p-3 rounded-lg'>
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='bg-slate-700 text-white py-3 rounded-lg font-medium hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}