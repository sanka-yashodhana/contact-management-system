import LoginForm from "@/app/_components/LoginForm";
import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h1>Login</h1>
      <LoginForm />
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link href="/register" style={{ textDecoration: "underline" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;