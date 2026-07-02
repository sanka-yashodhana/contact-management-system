"use client";
import React from 'react'
import { logoutAction } from '../actions/auth';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
      try {
        await logoutAction();
        router.push("/login")
        router.refresh();

      } catch (error) {
        console.log("Logout failed : ", error)
      }
  }
  return (
    <button onClick={handleLogout} className="btn btn-sm btn-logout">Logout</button>
  )
}

export default LogoutButton