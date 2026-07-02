"use client";
import React from 'react';

import { useFormStatus } from 'react-dom'; // Keep useFormStatus from react-dom
import { useActionState } from 'react'; // Import useActionState from react

import { loginAction } from '../actions/auth';

const initialState = {
  success: false, 
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="btn btn-primary btn-block"
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  );
}

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1>Welcome Back</h1>
        <p className="text-sm text-text-color-light">
          Sign in to manage your contacts.
        </p>
      </div>
      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="form-control"
            placeholder="••••••••"
          />
        </div>
        {state && !state.success && state.message && (
          <p className="error-message">{state.message}</p>
        )}
        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <SubmitButton />
        </div>
      </form>
      <p
        className="text-center text-sm"
        style={{ color: 'var(--text-color-light)', marginTop: '1.5rem' }}
      >
        Don&apos;t have an account? <a href="/register" style={{ color: 'var(--primary-color)' }} className="hover:underline">Register</a>
      </p>
    </div>
  );
};

export default LoginForm