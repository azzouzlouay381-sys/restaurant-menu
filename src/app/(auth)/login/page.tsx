'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// 1. We move the form logic inside its own internal component that uses the hook safely
function LoginFormContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  return (
    <form className="space-y-4 w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="email" 
          placeholder="admin@restaurant.com" 
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 text-black outline-none"
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 text-black outline-none"
          required 
        />
      </div>

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <button 
        type="submit" 
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Login to Dashboard
      </button>
    </form>
  );
}

// 2. The main page component exports the form inside a Suspense wrapper
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 px-4">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
          Loading interface...
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}