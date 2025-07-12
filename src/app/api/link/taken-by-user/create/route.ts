import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import LinkTakenByUser from "@/models/LinkTakenByUser";
import getCookieToken from "@/utils/getCookieToken";

export async function POST(req: Request) {
    await connectDB()
    try {
        const { affiliator_id, linkUid, csrfToken } = await req.json();
        const csrfTokenFromCookie = getCookieToken(req, "csrf_secret");

        if (!csrfTokenFromCookie || !csrfToken || csrfTokenFromCookie !== csrfToken) {
            return NextResponse.json({ message: "Invalid CSRF" }, { status: 403 });
        }

        await LinkTakenByUser.create({
            affiliator_id,
            linkUid,
        });

        return NextResponse.json({ message: "Link taken by user successfully!" }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error created a new LinkTakenByUser : ", error);
        return NextResponse.json({ message }, { status: 500 });
    }
}