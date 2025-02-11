import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu } from '@headlessui/react';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation: NavigationItem[] = [
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
    ...(user ? [{ name: 'Practice Tests', href: '/test', current: location.pathname === '/test' }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-semibold text-gray-900 mr-8">
            ACT Coach
          </Link>
          <div className="nav-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          {user ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                  {user.email?.[0].toUpperCase()}
                </div>
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              to="/auth"
              className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;