import React, { useState } from 'react';
import { Container, Logo } from '../index';
import LogoutBtn from './LogoutBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 items-center">
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
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 space-y-4 lg:hidden">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  if (item.active) {
                    return (
                      <li key={item.name}>
                        <button
                          className="block w-full text-left text-lg font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md transition-colors duration-200"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(item.slug);
                          }}
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
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
