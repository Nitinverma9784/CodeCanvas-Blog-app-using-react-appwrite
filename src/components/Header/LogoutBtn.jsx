import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-block px-6 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full shadow-sm transition duration-200 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
