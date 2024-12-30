import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate('/');
        }
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
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register('name', { required: 'Full name is required' })}
          />
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
            {...register('password', {
              required: 'Password is required',
            })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
