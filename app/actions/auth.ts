"use server";

import { redirect } from "next/navigation";
import { deleteSession, setSession, SessionUser } from "../_lib/session";
import dbConnect from "../_lib/dbConnect";
import User from "../_models/User";

export const loginAction = async (
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData
) => {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  let loginSuccessful = false;
  try {
    await dbConnect();

    const user = await User.findOne({ email: email, password: password });

    if (!user) {
      return { success: false, message: "Invalid Credentials" };
    }

    const sessionUser: SessionUser = { id: user.id, name: user.name, email: user.email };
    await setSession(sessionUser);
    loginSuccessful = true;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unknown error occurred." };
  }

  if (loginSuccessful) {
    redirect("/");
  }
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/login");
};

export const registerAction = async (
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData
) => {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!name || !email || !password) {
    return { success: false, message: "Name, email and password are required." };
  }

  let registrationSuccessful = false;
  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User with this email already exists." };
    }

    const newUser = await User.create({ name, email, password });

    const sessionUser: SessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    await setSession(sessionUser);
    registrationSuccessful = true;
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "An unknown error occurred." };
  }

  if (registrationSuccessful) {
    redirect("/");
  }
};