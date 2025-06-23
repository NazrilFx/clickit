import { IUser } from "@/models/User";

export default async function getCurrentUser(): Promise<IUser | null> {
    try {
        const res = await fetch('/api/auth/me', {
            method: 'GET',
            credentials: 'include', // agar cookie ikut terkirim
        });

        if (!res.ok) return null;

        const json = await res.json();
        return json.user || null;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error fetching current user : ", message);
        return null
    }
}