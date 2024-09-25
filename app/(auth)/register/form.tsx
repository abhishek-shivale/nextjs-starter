'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/global/spinner/Loader';

const initialState = {
  email: '',
  password: '',
  terms: false,
  showPassword: false,
  loading: false,
};

function Form() {
  const [state, setState] = React.useState(initialState);

  const router = useRouter();

  const handelClick = async () => {
    if (!state.terms) return alert('Please accept terms and conditions');
    if (!state.email) return alert('Please enter email');
    if (!state.password) return alert('Please enter password');
    setState({ ...state, loading: true });
    const res = await signIn('register', {
      email: state.email,
      password: state.password,
      redirect: false,
    });
    setState({ ...state, loading: false });
    if (res?.ok === false) return alert('Invalid email or password');
    if (res?.ok === true) return router.push('/');
  };
  const handelGoogle = async () => {
    setState({ ...state, loading: true });
    const res = await signIn('google', {
    });
    setState({ ...state, loading: false });
    if (res?.ok === false) return alert('something went wrong');
    if (res?.ok === true) return router.push('/');
  };

  return (
    <div className='z-50 w-full max-w-[400px] space-y-6 px-6 py-8'>
      <div className='flex justify-center'>
        <MountainIcon className='h-8 w-8' />
        <span className='sr-only'>Acme Inc</span>
      </div>
      <div className='space-y-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
            placeholder='m@example.com'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              onChange={e => setState({ ...state, password: e.target.value })}
              id='password'
              value={state.password}
              type={state.showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              required
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setState({ ...state, showPassword: !state.showPassword })}
              className='absolute right-2 top-1/2 -translate-y-1/2'
            >
              {state.showPassword ? (
                <EyeIcon className='h-5 w-5' />
              ) : (
                <EyeClosedIcon className='h-5 w-5' />
              )}
              <span className='sr-only'>Show password</span>
            </Button>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='terms'
            checked={state.terms}
            onCheckedChange={() => setState({ ...state, terms: !state.terms })}
          />
          <Label htmlFor='terms'>
            I accept the{' '}
            <Link href='#' className='underline underline-offset-2' prefetch={false}>
              Terms and Conditions
            </Link>
          </Label>
        </div>
      </div>
      {state.loading ? (
        <Button className='w-full'>
          <Loader />
        </Button>
      ) : (
        <Button className='w-full' onClick={handelClick}>
          Register
        </Button>
      )}

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
        </div>
      </div>
      <div className='space-y-2'>
        {state.loading ? (
          <Button variant='outline' className='w-full'>
            <Loader color='black' />
          </Button>
        ) : (
          <Button variant='outline' className='w-full' onClick={handelGoogle}>
            <ChromeIcon className='mr-2 h-4 w-4' />
            Register with Google
          </Button>
        )}
        <div className='text-center text-sm'>
          Already have an account,{' '}
          <Link href='/login' className='underline' prefetch={false}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;

function ChromeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='100'
      height='100'
      viewBox='0 0 48 48'
    >
      <path
        fill='#fbc02d'
        d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
      <path
        fill='#e53935'
        d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
      ></path>
      <path
        fill='#4caf50'
        d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
      ></path>
      <path
        fill='#1565c0'
        d='M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
      ></path>
    </svg>
  );
}

function EyeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}

function MountainIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}
