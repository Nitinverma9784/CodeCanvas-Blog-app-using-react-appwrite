import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <Logo width="80px" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPattern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
                    value
                  ) || 'Email address must be valid.',
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
