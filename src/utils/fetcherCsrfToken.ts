// utils/getCsrfToken.ts
export default async function getCsrfToken(): Promise<string | null> {
    try {
        const res = await fetch('/api/csrf', {
            method: 'GET',
            credentials: 'include', // agar cookie ikut terkirim
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.csrfToken || null;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error fetching csrf token : ", message);
        return null
    }
}
