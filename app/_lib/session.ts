import { cookies } from "next/headers";
import { IUser } from "../_models/User";

// Set session cookie
export const setSession = async (user: Omit<IUser, "password">) => {
    (await cookies()).set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60*60*24*7,
        path: "/",
    });
    };


// Get session coookie
export const getSession = async () : Promise<IUser | null> => {
    const session = (await cookies()).get("session")?.value;
    if(!session) return null;
    const user = JSON.parse(session) as IUser;
    return user;
}

// Delete session cokkie
export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}