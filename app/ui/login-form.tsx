'use client';

import { Inter } from 'next/font/google';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

const inter = Inter({subsets: ['latin'] });

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <div className="w-full">
        <h1 className={`${inter.className} mb-3 text-2xl`}> Please login to continue. </h1>
      </div>
      <div className="w-full mb-3 mt-5">
        <h1 className={`${inter.className}`}> Username </h1>
        <input 
          className="block rounded-md w-full border py-[9px] pl-1"
          id="username" 
          type="text" 
          name="username"
          placeholder="Enter Username" 
          required/>
      </div>
      <div className="w-full mb-3 mt-5">
      <h1 className={`${inter.className}`}> Password </h1>
        <input 
          className="block rounded-md w-full border py-[9px] pl-1"
          id="password" 
          type="password" 
          name="password"
          placeholder="Enter Password" 
          required/>
      </div>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="rounded-md mt-4 w-full" aria-disabled={pending}>
      Login
    </Button>
  );
}