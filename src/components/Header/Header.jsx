import React from 'react';
import { Container, Logo } from '../index';
import LogoutBtn from './LogoutBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="bg-white shadow-sm py-6">
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>
          <ul className="flex space-x-6 items-center">
            {navItems.map((item) => {
              if (item.active) {
                return (
                  <li key={item.name}>
                    <button
                      className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md transition-colors duration-200"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              }
              return null;
            })}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
