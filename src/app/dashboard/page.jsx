'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  if (isPending) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-slate-400'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Dashboard Header */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div>
            <h1 className='text-xl font-bold text-slate-700'>Dashboard</h1>
            <p className='text-sm text-slate-400'>
              Welcome back, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className='text-sm text-red-500 hover:underline'
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className='max-w-6xl mx-auto px-4 py-8'>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>
          <Link href='/create-listing'>
            <div className='bg-slate-700 text-white p-6 rounded-xl hover:bg-slate-600 transition cursor-pointer'>
              <h2 className='text-lg font-semibold mb-1'>+ Add New Listing</h2>
              <p className='text-slate-300 text-sm'>Post a new property for sale or rent</p>
            </div>
          </Link>
          <Link href='/dashboard/listings'>
            <div className='bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition cursor-pointer'>
              <h2 className='text-lg font-semibold text-slate-700 mb-1'>Manage Listings</h2>
              <p className='text-slate-400 text-sm'>Edit, update or remove properties</p>
            </div>
          </Link>
        </div>

        {/* Stats — placeholder for now, we wire real data later */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {[
            { label: 'Total Listings', value: '—' },
            { label: 'Active', value: '—' },
            { label: 'Sold / Rented', value: '—' },
            { label: 'Total Views', value: '—' },
          ].map((stat) => (
            <div
              key={stat.label}
              className='bg-white border border-slate-200 p-4 rounded-xl text-center'
            >
              <p className='text-2xl font-bold text-slate-700'>{stat.value}</p>
              <p className='text-xs text-slate-400 mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}