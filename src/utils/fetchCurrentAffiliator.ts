import { IAffiliator } from "@/models/Affiliator";

export default async function getCurrentAffiliator(): Promise<IAffiliator | null> {
    try {
        const res = await fetch('/api/auth-affiliator/me', {
            method: 'GET',
            credentials: 'include', // agar cookie ikut terkirim
        });

        if (!res.ok) return null;

        const json = await res.json();
        return json.affiliator || null;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error fetching current affiliator : ", message);
        return null
    }
}