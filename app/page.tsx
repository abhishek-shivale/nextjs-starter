'use client';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div>
        <div className='flex flex-wrap gap-10 border px-8 py-4'>
          <p>
            {status === 'authenticated'
              ? `You are logged in as ${session?.user?.email}`
              : 'Your are not logged in'}
          </p>
          {status === 'unauthenticated' ? (
            <Button onClick={() => router.push('/login')}>Login</Button>
          ) : (
            <div className='flex gap-4'>

            <Button onClick={() => router.push('/protected/dashboard')}>Dashboard</Button>
            <Button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
