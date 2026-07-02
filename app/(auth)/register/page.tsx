import RegisterForm from "@/app/_components/RegisterForm";
import React from "react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "50px" }}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <RegisterForm />
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
