import { cookies } from "next/headers";

export interface SessionUser {
    id: string;
    name: string;
    email: string;
}

// Set session cookie
export const setSession = async (user: SessionUser) => {
    (await cookies()).set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
    });
};

// Get session coookie
export const getSession = async (): Promise<SessionUser | null> => {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    try {
        return JSON.parse(session) as SessionUser;
    } catch (error) {
        console.error("Failed to parse session:", error);
        return null;
    }
}

// Delete session cokkie
export const deleteSession = async () => {
    (await cookies()).delete("session");
}