import { ICategory } from "@/models/Category";

export default async function getAllCategories(): Promise<ICategory | null> {
    try {
        const res = await fetch('/api/category', {
            method: 'GET',
            credentials: 'include', // agar cookie ikut terkirim
        });

        if (!res.ok) return null;

        const json = await res.json();
        return json.categories || [];

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error fetching categories : ", message);
        return null
    }
}