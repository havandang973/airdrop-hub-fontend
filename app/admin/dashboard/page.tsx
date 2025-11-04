'use client';
import { useMe } from '@/lib/auth';
import { useEffect } from 'react';

export default function Page() {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-4 p-6 bg-white rounded-lg shadow-md">ABI</div>
    </div>
  );
}
