import Link from 'next/link';
import React from 'react';
import LoginButton from './LogoutButton';
import { getSession } from '../_lib/session';
import { FiUserPlus } from 'react-icons/fi';

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <span className="navbar-brand-icon"><FiUserPlus /></span>
          <span>Contact Manager</span>
        </Link>

        <div className="navbar-links">
          {session ? (
            <>
              <Link
                href="/contact"
                className="btn btn-sm btn-secondary"
              >
                Contacts
              </Link>
              <LoginButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-sm btn-secondary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-sm btn-primary"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;