"use client";
import React from 'react';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { registerAction } from '../actions/auth';
import Link from 'next/link';

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
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h1>Create an Account</h1>
        <p className="text-sm text-text-color-light">
          Join to start managing your contacts.
        </p>
      </div>
      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
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
        Already have an account? <Link href="/login" style={{ color: 'var(--primary-color)' }} className="hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
