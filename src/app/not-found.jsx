import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <h1 className='text-6xl font-bold text-slate-700'>404</h1>
      <h2 className='text-2xl font-semibold text-slate-500'>
        This property doesn&apos;t exist
      </h2>
      <p className='text-gray-400 text-sm'>
        The page you&apos;re looking for has been removed or never existed.
      </p>
      <Link
        href='/'
        className='bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition'
      >
        Back to Homepage
      </Link>
    </div>
  );
}